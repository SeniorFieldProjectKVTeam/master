'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;
app.on('ready', function(){
	mainWindow = new BrowserWindow({
		height:600,
		width: 800
	});
	mainWindow.loadURL('file://' + __dirname + '/app/switch_present.html');
});

var ipc = require('electron').ipcMain;
ipc.on('test', function(){
	app.quit();
});