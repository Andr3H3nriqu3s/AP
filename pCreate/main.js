const electron = require('electron');
const {app, BrowserWindow, Menu} = electron;

var startedWin;

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

app.on('ready', createStartWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createStartWindow()
    }
})