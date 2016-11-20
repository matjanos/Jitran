import * as https from "https";

export interface TranslationService {
    translate(sourceLang: string, targetLang: string, queryString: string, callback: any)
}


export class GoogleTranslationService {
    public translate(sourceLang: string, targetLang: string, queryString: string, callback: any) {

        let uriString = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
            sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(queryString);

        https.get(uriString, (res) => {
            var body = "";

            res.on('data', function (chunk) {
                body += chunk;
            });

            res.on('end', function () {
                var myRegexp = /([aA-zZ ]+)(?=\",)/g;
                var match = myRegexp.exec(body);
                console.log(match);
                callback(match[0]);
            });

        }).on('error', (e) => {
            console.error(e);
        });
    }
}