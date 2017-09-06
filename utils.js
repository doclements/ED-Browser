module.exports =  Utils = {
    sayHello : function(msg) {
        console.log("Hello "+msg);
    },

    processFile : function(data, trace1, colors, events,cmdr){
        var array = data.toString().split("\n");
        for(i in array) {
            //console.log(array[i].length);

            if(array[i].length>0){
                let line = JSON.parse(array[i]);
                //console.log(line)
                events.push(line.event)
                if(line.event=="LoadGame"){
                    
                    if(!(line.Commander==cmdr)){
                        //console.log("kicking record for cmdr : "+line.Commander);
                        
                        break;
                    }
                }
                if(line.event=="FSDJump"){
                    let sp = line.StarPos;
                    //console.log(sp);
                    trace1.x.push(sp[0]);
                    trace1.y.push(sp[1]);
                    trace1.z.push(sp[2]);
                    colors.push(sp);
                }
            }
        }
    },


    processEvents : function(data, events, storage){
        var array = data.toString().split("\n");
        for (ev in events){
            if((events[ev] in storage)==false){
                console.log("initialising key");
                  storage[events[ev]] = [];
            } 
        }
        for(i in array) {
            if(array[i].length>0){
                let line = JSON.parse(array[i]);
                for (ev in events){
                    if(line.event==events[ev]){
                        storage[events[ev]].push(line); 
                    }
                }
            }
        }
    },

    processDistance : function(data,storage,cmdr){
    
        var array = data.toString().split("\n");
        for (var p = 0; p < array.length; p++) {
            if(array[p].length>0){
                let line = JSON.parse(array[p]);
                
                if(line.event=="LoadGame"){

                    if(!(line.Commander==cmdr)){
                        console.log("kicking record for cmdr : "+line.Commander);
                        
                        break;
                    }
                }
                if(line.event=="FSDJump"){
                    let sp = line.StarPos;
                    //console.log(sp);
                    storage.push([sp[0],sp[1],sp[2]]);
                    
                }
            }
            
        }
        
        
        
        
        // /console.log(route);
    },
    ThreeDdistance : function(point1,point2){
        //console.log("doinmg it");
        //console.log(point1);
        //console.log(point2);
        let x2 = Math.abs((point1[0])-(point2[0])) * Math.abs((point1[0])-(point2[0]));
        //console.log((point1[0])-(point2[0]));
        let y2 = Math.abs((point1[1])-(point2[1])) * Math.abs((point1[1])-(point2[1]));
        //console.log((point1[1])-(point2[1]));
        let z2 = Math.abs((point1[2])-(point2[2])) * Math.abs((point1[2])-(point2[2]));
        //console.log((point1[2])-(point2[2]));
        //console.log(x2,y2,z2);
        return (Math.sqrt((x2+y2+z2))) < 55 ? (Math.sqrt((x2+y2+z2))) : 0
    }
}

