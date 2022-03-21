/**
 * @desc electron 主入口
 */
const path = require('path')
const { app, BrowserWindow } = require('electron') ;
const  isDev = require('electron-is-dev') ;



function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
    },
  });

  if (isDev) {
    mainWindow.loadURL(`http://127.0.0.1:3000`);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, '../dist/index.html')}`);
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});