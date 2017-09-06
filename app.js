const readline = require('readline');
const fs = require('fs');
const utils = require('./utils.js');


const inputFile = fs.createReadStream("ed_journals/Journal.161213191106.01.log");
const APIKEY = 'Lx9Gc3KIAJW34zCRycqL';
const APIUSER = 'doclements'

const plotly = require('plotly')(APIUSER, APIKEY);

const express = require('express')
const app = express()
app.use(express.static('public'))

app.set('view engine', 'pug')
app.get('/browser',function(req,res){
    res.sendFile(__dirname +'/dash.html');
})
app.get('/getdistance/:_cmdr', function (req, res) {
    let events = [];
    let  trace1 = {
            x : [
        
            ],
            y : [
        
            ],
            z : [
        
            ],
            mode: 'lines',
            line: {
              color: 1,
              reversescale: false,
              width: 3
            },
            type: "scatter3d"
          };
    let dir = "ed_journals";
    let requests;
    let cmdr = req.params._cmdr;

    
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
    
        var pending = list.length;
    
        if (!pending) return done(null, results);
        const fileCount = list.length;
        let filesRead = 0;
        let colors = [];
        requests = list.map(function(file){
            return new Promise((resolve) => {
                fs.readFile(dir+'/'+file, function(err, data) {
                    if(err) throw err;
                    utils.processFile(data, trace1, colors, events,cmdr)
                    resolve();
                });
                
              });
            ////console.log(dir+'/'+file);
            
        });
         ////console.log(trace1);
         Promise.all(requests).then(() => {
             let total_dist = []
             //console.log(colors);
             for (var x = 0; x < colors.length-1; x++) {
                //console.log(utils.ThreeDdistance(colors[x],colors[x+1]));
                if(total_dist.length>1){
                 total_dist.push(total_dist[x-1] + utils.ThreeDdistance(colors[x],colors[x+1]));
                }
                else {
                    total_dist.push( utils.ThreeDdistance(colors[x],colors[x+1]));
                }
                 
             }
             //console.log(total_dist);
           //fs.readFile('index.html', "utf8", function(err, data) {
            //res.send(data.replace('__trace__',JSON.stringify(trace1).slice(0, -1)).replace('__colors__',total_dist.toString()).toString());
           //});
           res.send({trace1 : trace1,colors:total_dist});

        });
    })
    
 
})

app.listen(3000, function () {
  //console.log('Example app listening on port 3000!')
})











// var rl = readline.createInterface({
//     input : dir+'/'+file,
//     output: process.stdout
// });


// rl.on('line', (input) => {
//     //do some code here
//     ////console.log(input);
//     let line = JSON.parse(input);
//     // ///console.log(line)
//     //events.push(line.event)
//     if(line.event=="FSDJump"){
//         let sp = line.StarPos;
//         //console.log(sp);
//         trace1.x.push(sp[0]);
//         trace1.y.push(sp[1]);
//         trace1.z.push(sp[2]);
//     }

// });

// rl.on('close', (input) => {
//     filesRead = filesRead + 1;
//     if (filesRead===fileCount){
        
    
//     //let result = [...new Set(events)];
//     //console.log(trace1);
//     // var data = [trace1];
//     // var layout = {margin: {
//     //     l: 0,
//     //     r: 0,
//     //     b: 0,
//     //     t: 0
//     //   }};
//     // var graphOptions = {layout: layout, filename: "simple-3d-scatter", fileopt: "overwrite"};
//     // plotly.plot(data, graphOptions, function (err, msg) {
//     //     //console.log(msg);
//     // });
//     }
// });







