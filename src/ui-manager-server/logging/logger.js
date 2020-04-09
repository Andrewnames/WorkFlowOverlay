var pino = require('pino');
const path = require('path');
const LOG_FOLDER = 'logs';
const LOG_FILE = path.join(LOG_FOLDER, 'ui-manager.log');
const fsPromises = require('fs').promises;
const self = this;

// ensure logs folder exists
fsPromises.mkdir(LOG_FOLDER, {recursive:true});

  exports.getLogger = function (loggerName) {
    var options = {
      base: {
        name: 'no filename'
      },
      
      useLevelLabels: true,
      timestamp: self.get_formatted_date_for_logger
    };

    if (loggerName && loggerName.length > 0) {
      options.name = loggerName;
    }
    const pinoLogger = pino(options, LOG_FILE);
    return pinoLogger;
  };

// yyyy-MM-dd hh:mm:ss:eee
exports.get_formatted_date_for_logger = function() {
  const date = new Date();
  return ',"time":"' + date.getFullYear().toString()
      + '-'
      + ('0' + (date.getMonth() + 1)).slice(-2) // 0-padding to get 2 digits
      + '-'
      + ('0' + date.getDate()).slice(-2)
      + ' '
      + ('0' + date.getHours()).slice(-2)
      + ':'
      + ('0' + date.getMinutes()).slice(-2)
      + ':'
      + ('0' + date.getSeconds()).slice(-2)
      + '.'
      + ('00' + date.getMilliseconds()).slice(-3)
      + '"';
};
