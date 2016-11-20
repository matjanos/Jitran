import * as Electron from 'electron';
import * as menubar from 'menubar';

const WIDTH:number = 600;
const HEIGHT:number = 300;

class MainProcess {

    private mb : Menubar.MenubarApp;

    public createWindow() {
        this. mb = menubar(this.getMenuBarSettings());

        this.mb.on('ready', ()=> {
            console.log('JiTranslate ready');
            this.mb.window = new Electron.BrowserWindow({
                frame:false,
                transparent: true,
                width:WIDTH,
                height:HEIGHT,
                maximizable: false,
                modal:true,
                movable:false,
                alwaysOnTop:true,
                fullscreenable: false,
                icon:'./ico/tray.png',
                skipTaskbar: true
            });
            this.mb.window.loadURL(`${__dirname}/index.html`)
            this.mb.window.hide();
        });
        this.mb.app.on('activate', function () {
          this.mb.showWindow()
        })
    }

    public getMenuBarSettings():Menubar.MenubarOptions{
        let options :Menubar.MenubarOptions;
        options = {
            icon:'./ico/tray.png',
            preloadWindow:true,
            width:WIDTH,
            height:HEIGHT
        }

        return options;
    }
}

let mainProcess = new MainProcess();
mainProcess.createWindow();