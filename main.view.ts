let rivets = require("rivets");
let electron = require("electron");

var query={
  source: '<<query>>',
  translation: '<<translation>>'
}


electron.remote.ipcMain.on('translation-performed',(args)=>{
  query.source = args.query;
  query.translation = args.translation;
});


var element =document.getElementById('translation');
console.log (element);

rivets.bind(
  element,
  { query: query }
);
