import { remote, ipcMain, app, BrowserWindow, clipboard } from 'electron';
import * as menubar from 'menubar';
import { TranslationService, GoogleTranslationService } from "./translationService";

const WIDTH:number = 600;
const HEIGHT:number = 300;

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
                height:HEIGHT-25,
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
          this.mb.showWindow();
        })

        this.mb.on('show', ()=>{
            let query = window.getSelection().toString();
            console.log(query);
            let sourceLang='auto';
            let destinationLang='pl';

            this._translateService.translate(sourceLang, destinationLang, query,
                (result)=>{
                    ipcMain.emit('translation-performed', {query: query, translation:result, sourceLang:sourceLang, destinationLang: destinationLang});
                })
        });
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

let mainProcess = new MainProcess(new GoogleTranslationService());
mainProcess.createWindow();