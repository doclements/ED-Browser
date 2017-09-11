const utils = require('./utils.js');
const fs = require('fs');




utils.sayHello('test');
let dir = "ed_journals";
let requests;
let  trace1 = {
    x : [

    ],
    y : [

    ],
    z : [

    ],
    mode: 'line',
    line: {
      color: 1,
      reversescale: false,
      width: 3
    },
    type: "scatter3d"
  };
let colors = [],
events = [];
eventsToKeep = ['ModuleBuy', 'FSDJump','MaterialCollected','MaterialDiscarded']
storage = []
let cmdr = "Blantyre";
fs.readdir(dir, function(err, list) {
    if (err) return done(err);

    var pending = list.length;

    if (!pending) return done(null, results);
    const fileCount = list.length;
    let filesRead = 0;
    requests = list.map(function(file){
        return new Promise((resolve) => {
            fs.readFile(dir+'/'+file, function(err, data) {
                if(err) throw err;
                //utils.processEvents(data, eventsToKeep, storage);
                utils.processDistance(data,storage, cmdr);
                resolve();
            });
            
          });
        ////console.log(dir+'/'+file);
        
    });
     ////console.log(trace1);
     Promise.all(requests).then(() => {
      
        ////console.log(storage);
        let total_dist = 0;
        for (var x = 0; x < storage.length-1; x++) {
           let dist =  utils.ThreeDdistance(storage[x],storage[x+1]);
        total_dist = total_dist + dist;
        }
        //console.log(total_dist);
      

    });
})