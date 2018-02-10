const electron = require('electron');
const ipcMain = electron.ipcMain;
const menubar = require('menubar');
const path = require('path');
require('dotenv').config();

const mb = menubar({
    tooltip: 'You are one click away from awesomeness!',
    icon: 'Icon/Icon.png',
    index: path.join('file://', __dirname, 'index.html'),
    width: 600,
    height: 600
});

mb.on('ready', function ready() {
    console.log('app is ready');
});
