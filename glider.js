var csv = require("fast-csv");
const APIKEY = 'g5JQdJcLgVqJnE17vUov';
const APIUSER = 'doclements'
const plotly = require('plotly')(APIUSER, APIKEY);


let looking = false;
let ds = [];
let holder = [];
let c = [];
let  trace2 = {
    x : [

    ],
    y : [

    ],
    z : [

    ],
    mode: 'markers',
    marker: {
		color: [],
		size: 2,
        symbol: 'circle'
    },
    type: "scatter3d"
  };
let  trace1 = {
    x : [

    ],
    y : [

    ],
    z : [

    ],
    mode: 'lines',
    line: {
      color: [],
      reversescale: false,
      colorscale: 'Bluered',
      text: [],
      width: 6
    },
    type: "scatter3d"
  };
let colors = [],
count = 0;
csv.fromPath("glider.csv")
.on("data", function(data){

    if((count<3000)){
    if(data[0].length>0 & !looking ){
    //console.log(data);
    looking = true;
    holder.push(data[0],data[1],data[2]);
    trace1.x.push(data[1]);
    trace1.y.push(data[2]);

    trace1.z.push(data[0]);
    trace2.x.push(data[1]);
    trace2.y.push(data[2]);

    trace2.z.push(data[0]);
    }
    if(looking){
        if(data[3].length>0 ){
            //console.log(data);
            holder.push(data[3]);
            looking = false;
            ds.push(holder);
            colors.push(data[3]);
            if(data[3]==0){
                data[3] = NaN;
            }

            trace1.line.color.push(data[3])
            trace2.marker.color.push(data[3])
            holder = [];
            count++;
        }
    }
}
})
.on("end", function(){
    console.log("done");
    console.log(trace1.line.color);
    trace1.line.text = trace1.line.color;
    var layout = {
        title: "Mt Bruno Elevation",
        autosize: false,
        width: 1000,
        height: 1000,
        margin: {
          l: 65,
          r: 50,
          b: 65,
          t: 90
        },
        hoverinfo: 'all'
      };
      var graphOptions = {layout: layout, filename: "elevations-3d-surface", fileopt: "overwrite"};
      plotly.plot([trace2], graphOptions, function (err, msg) {
          if(err) console.log(err);
          console.log(msg);
      });
});

