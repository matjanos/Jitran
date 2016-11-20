import * as Electron from 'electron';

class MainProcess{

    /**
     *
     */
    constructor(private _htmlFile:string) {
    }

    public createWindow(){
        let win = new Electron.BrowserWindow({width: 800, height: 600});
        win.on('closed', () => {
            win = null
        });
        
        // Or load a local HTML file
        win.loadURL(`file://${__dirname}/${this._htmlFile}`);
    }
}

Electron.app.on('ready',()=>{
    let mainProcess = new MainProcess("index.html");
    mainProcess.createWindow();
});