/**
 * Julien RAJERISON
 * 03 Janv 2019
 */
const rp = require('request-promise');
const $ = require('cheerio');
const fs = require('fs');
var replace = require("replace");
const url = 'https://ohabolana.org/ohabolana/lisitra';
// const url = 'https://ohabolana.org/ohabolana/tag/fahamarinana';

rp(url).then(function(html){
        const ohabolana = [];
        for (let i = 0; i < 20; i++) {
            ohabolana.push({'title': $('.obox > a', html)[i].children[0].data});
        }
        fs.appendFile("./ohab.json", JSON.stringify(ohabolana, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
        fs.readFile("./ohab.json", 'utf8', function (err,data) {
            if (err) {
                return console.log(err);
            }
            let result = data.replace(/]\[/gm, ',');
                fs.writeFile("./ohab.json", result, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
        })
    }).catch(function(err){
        console.log(err)
    });