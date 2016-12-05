import { TlsOptions } from './node_modules/.staging/@types/node-47e7acc4/index.d';
import { TranslationService } from './translationService';
import * as https from "https";
let jQuery= require("jquery");
let $=jQuery;

export interface TranslationService {
    translate(sourceLang: string, targetLang: string, queryString: string, callback: any)
}

export class DummyTranslationService implements TranslationService{
   translate(sourceLang: string, targetLang: string, queryString: string, callback: any){
       setTimeout(()=>callback("    translated "+queryString),400);
   }
}


export class GoogleTranslationService implements TranslationService {
    public translate(sourceLang: string, targetLang: string, queryString: string, callback: any) {

        let uriString = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
            sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(queryString);

        console.log(uriString);

        let options = require('url').parse(uriString);
        options.headers = {
            "Accept-Charset":"utf-8"
        }

        $.getJSON(uriString,{}, (data, status, xhr) =>{
                console.log(data);
                 var myRegexp = /([aA-zZ ]+)(?=\",)/g;
                var match = myRegexp.exec(data);
                callback(match[0]);
        })
/*
        https.get(options, (res) => {
            var body = "";

            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', function () {
                var myRegexp = /([aA-zZ ]+)(?=\",)/g;
                var match = myRegexp.exec(body);
                console.log(body);
                callback(match[0]);
            });

        }).on('error', (e) => {
            console.error(e);
        });*/
    }
}