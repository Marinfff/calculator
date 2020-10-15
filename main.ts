import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 330,
    height: 430,
    title: 'Calculator',
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile("src/index.html");
  // mainWindow.webContents.openDevTools()
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
