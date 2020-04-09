const logger = require('./logger').getLogger(__filename.slice(__dirname.length + 1));
const pino = require('pino');
const path = require('path');
const LOG_FOLDER = 'logs';
const LOG_FILE = path.join(LOG_FOLDER, 'ui-manager.log');
const LOG_FILE_COUNT = 30;
const self = this;

exports.rotate_logs = async function() {
    // if current logfile creation date is yesterday, rotate it now
    try {
        var createdDate = await self.file_creation_time(LOG_FILE); // throws if file does not exist

        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);

        if (createdDate <= today) {
            var newFilename = LOG_FILE + '.' + self.get_formatted_date_YYYYMMDDhhmmss(createdDate);
            // copy-truncate the file
            await self.copy_truncate(LOG_FILE, newFilename);
        }
    }
    catch (err) {
        logger.error(err, 'rotate_logs: rotate current log');
    }
    // prune logfiles if over the maximum count
    try {
        var fileList = await self.get_list_file_entries(LOG_FOLDER);
        logger.info("Current logfile count: " + fileList.length);
        if (fileList.length > LOG_FILE_COUNT) {
            var deleteThese = [];
            for (var i = LOG_FILE_COUNT; i < fileList.length; i++) {
                deleteThese.push(fileList[i].path);
            }
            logger.info('Pruning ' + deleteThese.length + ' log files.');
            await self.delete_files(deleteThese);
        }
    }
    catch (err) {
        logger.error(err, 'rotate_logs: prune logs');
    }
}

exports.delete_files = function (arrayOfFilenames) {
    return Promise.all(arrayOfFilenames.map(file => {
        fsPromises.unlink(file).then(() => {
            return Promise.resolve();
        }).catch(err => {
            if (err.code == 'ENOENT') { // file not found
                return Promise.resolve(); // I wanted to delete it anyway, so don't throw.
            }
            else {
                return Promise.reject(err);
            }
        });
    }));
};

exports.get_formatted_date_YYYYMMDDhhmmss = function(date) {
    return date.getFullYear().toString()
        + ('0' + (date.getMonth() + 1)).slice(-2) // 0-padding to get 2 digits
        + ('0' + date.getDate()).slice(-2)
        + ('0' + date.getHours()).slice(-2)
        + ('0' + date.getMinutes()).slice(-2)
        + ('0' + date.getSeconds()).slice(-2);
};

/**
 * Get number of milliseconds until the specified time.
 * @param hour 24-hour value of specified time, e.g. 14 for 2pm
 * @param minute minutes of desired time
 * @param second seconds of desired time
 */
exports.get_milliseconds_until_specified_time = function (hour, minute, second, millisecond) {
    if (hour == undefined) hour = 0;
    if (minute == undefined) minute = 0;
    if (second == undefined) second = 0;
    if (millisecond == undefined) millisecond = 0;

    // calculate milliseconds until next 2am 
    const now = new Date();
    var dateTarget = new Date(now);
    dateTarget.setHours(hour);
    dateTarget.setMinutes(minute);
    dateTarget.setSeconds(second);
    /* added millisecond too here to get more precise time difference as backup scheduler was triggering n number of times due to time difference(in second) was resulting to 0*/
    dateTarget.setMilliseconds(millisecond);
    var milliseconds = dateTarget - now;
    if (milliseconds < 0) {
        // add 1 day
        dateTarget.setDate(dateTarget.getDate() + 1);
        milliseconds = dateTarget - now;
    }

    return milliseconds;
};
/**
 * Get creation timestamp for specified file.
 * @returns a Date object
 */
exports.file_creation_time = function(file) {
    return new Promise((resolve, reject) => {
        fsPromises.stat(file).then(fsStat => {
            if (fsStat.isFile()) {
                resolve(fsStat.birthtime);
            }
            else {
                reject();
            }
        })
        .catch(err => { // e.g., err.code=='ENOENT' (file does not exist)
            reject(err);
        });
    });
};

/**
 * Get a list of file "entries" in a directory.
 * @param directory The directory to look in
 * @param filenameMatch a string, only count files with this string in their filename
 * @returns lsit of objects, one per file, with structure: { name, path, time, size }
 */
exports.get_list_file_entries = function(directory, filenameMatch) {
    return new Promise(async (resolve, reject) => {
        try {
            // get list of files in the folder, sorted by modified time, descending (newest files first)
            var dirents = await fsPromises.readdir(directory, { withFileTypes: true });
            var sortedFileList = dirents.map(function (entry) {
                if (entry.isFile() && (filenameMatch == undefined || entry.name.indexOf(filenameMatch) > -1)) {
                    var stat = fs.statSync(path.join(directory, entry.name));
                    return {
                        name: entry.name,
                        path: path.join(directory, entry.name),
                        time: stat.mtime.getTime(),
                        size: stat.size
                    };
                }
            }).sort(function (a, b) {
                return b.time - a.time;
            });

            resolve(sortedFileList);

        }
        catch (err) {
            reject(err);
        }
    });

};
exports.init_rotation = async function() {
    // rotate now if necessary
    await self.rotate_logs();

    // schedule next rotation
    const msUntilTomorrow = self.get_milliseconds_until_specified_time(0, 0, 0, 0);
    setTimeout(self.rotate_logs, msUntilTomorrow);
}

/**
 * Copy srcFile to DestFile, then truncate srcFile to 0 bytes.
 */
exports.copy_truncate = function(srcFilename, destFilename, ) {
    return new Promise(async (resolve, reject) => {
        try {
            await fsPromises.copyFile(srcFilename, destFilename);
            await fsPromises.truncate(srcFilename, 0);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
};