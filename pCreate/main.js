const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain} = electron;
const dialog = electron.dialog;
const fs = require('fs');
const path = require('path');

/***@type BrowserWindow*/
var startedWin;
/***@type BrowserWindow*/
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

function createMainWindow(name) {
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
                },
                {
                    label: 'Presentaion',
                    click() {

                    }
                },
                {
                    label: 'Screens',
                    click() {

                    }
                }
            ]
        });
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
    mainWindow = new BrowserWindow({width: 800, height: 600, title: name});

    mainWindow.webContents.openDevTools();

    mainWindow.loadFile('windows/mainwin.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', () => {
    getLastProject();
    createStartWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
})

app.on('activate', () => {
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
        if (!fs.existsSync(workingDir)) {
            startedWin.webContents.send('errorM', 'No last project opened!');
            last = null;
            return;
        }
        workingDir = last;
    } else if (msg == '||:open') {
        let dir = dialog.showOpenDialog({properties: ['openFile']});
        console.log(dir);
        if (!dir) {
            startedWin.webContents.send('errorM', 'No invalid project file selected!');
            return;
        }
        dir = dir[0];
        let data = fs.readFileSync(dir);
        let json;   
        try {
            json = JSON.parse(data)
        }
        catch(err) {
            startedWin.webContents.send('errorM', 'No invalid project file selected!');
            return;
        }
        if (!json.name) {
            startedWin.webContents.send('errorM', 'No invalid project file selected!');
            return;
        }
        workingDir = dir;
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
    let configDir = require('os').homedir();
    configDir = path.join(configDir, 'Documents');
    configDir = path.join(configDir, 'AP');
    configDir = path.join(configDir, 'config');
    configDir = path.join(configDir, 'config.txt');
    let toJSON = {
        "last": workingDir
    };
    fs.writeFileSync(configDir, JSON.stringify(toJSON));
    last = workingDir;
    let data = fs.readFileSync(workingDir);
    data = JSON.parse(data);
    createMainWindow(data.name);
    startedWin.close();
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