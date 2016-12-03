import { Translation } from './translation';
let rivets = require("rivets");
let electron = require("electron");
let jQuery= require("jquery");
let $=jQuery;
let query = new Translation();
electron.remote.ipcMain.on('translation-performed',(args)=>{
  let q =<Translation> args.returnValue;
  query.source = q.source;
  query.translation = q.translation;
  query.destinationLang = q.destinationLang;
  query.sourceLang = q.sourceLang;

  $(".trans").textfill();
});


var element =$('#translation');
console.log (element);

rivets.bind(
  element,
  { query: query }
);
  