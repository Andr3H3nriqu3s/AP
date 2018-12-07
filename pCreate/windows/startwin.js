const {ipcRenderer} = require('electron'); 

function last() {
    ipcRenderer.send('load', "||:last");
}

function newP() {
    /*** 
     * @type String
     */
    var text = document.getElementById('newName').value;
    if (text.indexOf('\"') != -1 || text.indexOf('\'') != -1 || text.indexOf(':') != -1 || text.indexOf(':') != -1 || text == '' || text.indexOf(' ') != -1) {
        document.getElementById('errordiv').classList.remove('disabled');
        document.getElementById('divmessage').classList.remove('disabled');
        document.getElementById('perror').innerHTML = 'Invalid character in the name!';
        return;
    }
    ipcRenderer.send('load', text);
}   

function openP() {
    ipcRenderer.send('load', "||:open");
}

function closeerror() {
    document.getElementById('errordiv').classList.add('disabled');
    document.getElementById('divmessage').classList.add('disabled');
}

ipcRenderer.on('errorM', (event1, msg) => {
    document.getElementById('errordiv').classList.remove('disabled');
    document.getElementById('divmessage').classList.remove('disabled');
    document.getElementById('perror').innerHTML = msg;
});