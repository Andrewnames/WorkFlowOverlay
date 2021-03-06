const { app, BrowserWindow } = require('electron')
const {ipcMain} = require('electron')

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1366,
    height: 768,
    x:0,
    y:0,
    center:false,
    frame: false,
    resizable:false,
    kiosk:true,
    hasShadow:false,
    skipTaskbar:true,
    alwaysOnTop:true,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: {
  nodeIntegration: true,
}

  })


  win.loadURL(`file://${__dirname}/dist/Overlay/index.html`)

  //// uncomment below to open the DevTools.
  win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

ipcMain.on('wrap-window', (event, arg) => {
  win.width=370;
  console.log('win was wrapped'); // windows size change is not working yet
})

app.allowRendererProcessReuse = true;
// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})
