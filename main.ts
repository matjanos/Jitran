import { remote, ipcMain, app, BrowserWindow, globalShortcut, clipboard } from 'electron';
import * as menubar from 'menubar';
import { TranslationService, GoogleTranslationService,DummyTranslationService } from "./translationService";

const WIDTH:number = 600;
const HEIGHT:number = 320;

class MainProcess {

    constructor(private _translateService :TranslationService){
    }

    private mb : Menubar.MenubarApp;

    public createWindow() {
        this. mb = menubar(this.getMenuBarSettings());

        this.mb.on('ready', ()=> {
            console.log('JiTranslate ready');
            this.mb.window = new BrowserWindow({
                frame:false,
                transparent: true,
                width:WIDTH,
                height:HEIGHT-20,
                maximizable: false,
                modal:true,
                movable:false,
                alwaysOnTop:true,
                fullscreenable: false,
                icon:'./ico/tray.png',
                skipTaskbar: true
            });

            const ret = globalShortcut.register('CommandOrControl+M', () => {
                let query = clipboard.readText('selection');
                let sourceLang='auto';
                let destinationLang='pl';

                this._translateService.translate(sourceLang, destinationLang, query,
                    (result)=>{
                        let translation = {source: query, translation:result, sourceLang:sourceLang, destinationLang: destinationLang }
                        ipcMain.emit('translation-performed', { returnValue: translation });
                        this.mb.showWindow();
                        setTimeout(()=>this.mb.hideWindow(), 5000);
                    });

            });

            if (!ret) {
                console.log('registration failed')
            }

            // Check whether a shortcut is registered.
            console.log(globalShortcut.isRegistered('CommandOrControl+M'))


            this.mb.window.loadURL(`${__dirname}/index.html`)
            this.mb.window.hide();
        });
        this.mb.app.on('activate', function () {
          this.mb.showWindow();
        })
        this.mb.on('will-quit', () => {
            // Unregister a shortcut.
            globalShortcut.unregister('CommandOrControl+M')

            // Unregister all shortcuts.
            globalShortcut.unregisterAll()
            let destinationLang='pl';
            })
    }

    public getMenuBarSettings():    Menubar.MenubarOptions{
        let options :Menubar.MenubarOptions;
        options = {
            icon:'./ico/tray.png',
            preloadWindow:true,
            width:WIDTH,
            height:HEIGHT,
            windowPosition: "bottomRight"
        }

        return options;
    }
}

let mainProcess = new MainProcess(new GoogleTranslationService());
mainProcess.createWindow();