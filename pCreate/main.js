const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain} = electron;
const fs = require('fs');
const path = require('path');

/***@type BrowserWindow*/
var startedWin;
var mainWindow;
var last;
var workingDir;

function createStartWindow() {
    let template = [];
    if (process.platform == 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                {role: 'quit'}
            ]
        });
    } else {
        template.unshift({
            label: 'File',
            submenu: [
                {
                    label: 'quit',
                    click() {
                        app.quit();
                    }
                }
            ]
        });
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    startedWin = new BrowserWindow({width: 800, height: 600, resizable: false});

    startedWin.webContents.openDevTools();

    startedWin.loadFile('windows/startwin.html');

    startedWin.on('closed', () => {
        startedWin = null;
    });
}

function createMainWindow() {
    let template = [];
    if (process.platform == 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                {role: 'quit'}
            ]
        });
    } else {
        template.unshift({
            label: 'File',
            submenu: [
                {
                    label: 'quit',
                    click() {
                        app.quit();
                    }
                }
            ]
        });
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    mainWindow = new BrowserWindow({width: 800, height: 600});

    mainWindow.webContents.openDevTools();

    mainWindow.loadFile('windows/mainwin.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    createStartWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createStartWindow()
    }
})

ipcMain.on('load', (event, msg) => {
    if (msg == '||:last') {
        getLastProject();
        if (last == null) {
            startedWin.webContents.send('errorM', 'No last project opened!');
            return;
        }
        workingDir = last;
    } else if (msg == '||:open') {

    } else {
        let dir = require('os').homedir();
        dir = path.join(dir, 'Documents');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        dir = path.join(dir, 'AP');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        dir = path.join(dir, msg);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        dir = path.join(dir, msg + '.JSON');
        let json = {
            "name": msg,
            "slidePre": [],
            "slideScren": []
        };
        if (!fs.existsSync(dir)) {
            fs.writeFileSync(dir, JSON.stringify(json));
        }
        let data = fs.readFileSync(dir);
        json = JSON.parse(data);
        workingDir = dir;

    }
});

function getLastProject() {
    let dir = require('os').homedir();
    dir = path.join(dir, 'Documents');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    dir = path.join(dir, 'AP');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    dir = path.join(dir, 'config');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    dir = path.join(dir, 'config.txt');
    if (!fs.existsSync(dir)) {
        let toJSON = {
            "last": "||:none"
        };
        fs.writeFileSync(dir, JSON.stringify(toJSON));
        last = null;
        return;
    }
    let data = fs.readFileSync(dir);
    let fromJSON = JSON.parse(data);
    if (fromJSON.last == '||:none') {
        last = null;
        return;
    } else {
        last = fromJSON.last;
        return;
    }
}