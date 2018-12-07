var selectedSlide = null;
// mode = 1 pre mode != 1 screen
var mode = 1;
var canEdit = false;
var json = null;
const {ipcRenderer} = require('electron'); 

window.onload = () => {
    ipcRenderer.send('getJSON', '');   
}

ipcRenderer.on('ajson', (event, msg) => {
    json = msg;
    mode = 1;
    canEdit = true;
});

function addPre () {
    if (!canEdit) return;
}

function removePre () {
    if (!canEdit) return;
}

function loadSlidesToTable() {
    if (mode == 1) {
        json.slidePre.forEach((element, index) => {
            
        });
    } else {

    }
}