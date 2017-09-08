var GeoTIFF = require("geotiff");
var fs = require("fs");

const gfile = 'data/gebco2.tif';
const APIKEY = 'Lx9Gc3KIAJW34zCRycqL';
const APIUSER = 'doclements'
const plotly = require('plotly')(APIUSER, APIKEY);


function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

fs.readFile(gfile, function(err, data) {
  if (err) throw err;
  dataArray = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  var tiff = GeoTIFF.parse(dataArray);
  // ...
  
  console.log(tiff);
  var image = tiff.getImage(); // or use .getImage(n) where n is between 0 and
  // tiff.getImageCount()
  console.log(image.getResolution());

console.log(image.getWidth(), image.getHeight(), image.getSamplesPerPixel());
let rasters = image.readRasters()
console.log(image.getGDALMetadata());
var z_data = createArray(image.getWidth(),image.getHeight());

  for (var i = 1; i <= image.getHeight(); ++i) {
    for (var p = 1; p <= image.getWidth(); ++p) {
        var idx = i*image.getWidth()+p;
        //console.log(idx);
        z_data[i-1][p-1] = rasters[0][idx];
    }
  }
// console.log(rasters[0]);
// console.log((image.getWidth()/image.getHeight()));
// console.log(Math.min(...rasters[0]));
 var data = [
    {
      z: z_data,
      type: "surface"
    }
  ];
  var layout = {
    autosize: true,
    height :281,
    scene: {
        aspectratio: {
            x: 1 * (1/0.00832190476190477),
            y: 1 * (1/0.008307142857142713),
            z: 1 
        },
        xaxis: {
            type: 'linear',
            zeroline: false
        },
        yaxis: {
            type: 'linear',
            zeroline: false
        },
        zaxis: {
            type: 'linear',
            zeroline: false
        }
    },
    title: '3d point clustering',
    width: 477
};
//   var graphOptions = {layout: layout, filename: "elevations-3d-surface", fileopt: "overwrite"};
//   plotly.plot(data, graphOptions, function (err, msg) {
//       console.log(msg);
//   });
});

