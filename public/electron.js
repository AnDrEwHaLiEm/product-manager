const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require("url")
const appPath = app.getAppPath();
const Database = require(path.join(appPath, 'src', 'database.js'));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });
  const appURL = app.isPackaged
    ? url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
    : "http://localhost:3000";
  console.log(appURL);
  mainWindow.loadURL(appURL)

  // Open the DevTools.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.handle('get-products', async () => {
  return await Database.getProducts();
});

ipcMain.handle('create-product', async (event, name, quantity) => {
  return await Database.createProduct(name, quantity);
});

ipcMain.handle('update-product-quantity', async (event, id, quantity) => {
  return await Database.updateProductQuantity(id, quantity);
});
