var data;
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
var xa;
if (document.title=="India"){
    xa="./"
}
else{
    xa="../"
}   
//usage:
readTextFile(xa+"data/dataGaleri.json", function(text){
    data = JSON.parse(text);
    actualData=[...data];
    try{
        makeBigContent();
    }
    catch(error){
         initBigMap();
    }
});