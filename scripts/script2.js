var timer2;
function initBigMap() {
    // window.initMap = initMap;
    let points=[];
    console.log(data);
    points.push(data[0]);
  

    
    data.forEach(element => {
        if ((points.findIndex((x)=>x.coords.lng==element.coords.lng))<0){
            points.push(element);
        }
    });
    data.sort((a,b)=>a.coords.lat-b.coords.lat);
    let average=[0,0];
    average[0]=(data[data.length-1].coords.lat+data[0].coords.lat)/2;
    data.sort((a,b)=>a.coords.lng-b.coords.lng);
    average[1]=(data[data.length-1].coords.lng+data[0].coords.lng)/2;
    console.log(average);

    let activMap=document.getElementById("bigMap");
    let coord = { lat: average[0], lng: average[1]};
    let map = new google.maps.Map(activMap, {
      zoom: 8.5,
      center: coord,
    });
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true,
        zoom: 8.5,
        center: coord
    });
    // directionsRenderer.setMap(map);
    points.sort((a,b)=>a.coords.date-b.coords.date);
    points.forEach((element, i) => {
        const marker = new google.maps.Marker({
          position:{ lat: element.coords.lat, lng: element.coords.lng },
          map: map,
          title: `${i + 1}. ${element.title}`,
          label: `${i + 1}`,
          optimized: false,
        });
        marker.addListener("click", () => {
            findPhotos(marker.getTitle(),points);
        });
      });
      $("#myBtn").click(function(){
        if (!routeActiv){
            routeActiv=true;
        directionsRenderer.setMap(null);
        i=0;
        switTogle.disabled=true;
        switTogle.checked=false;
        directionsRenderer.setMap(null);
        $("#route").display="block";
            $("#route").html("")
            distance=0;
        timer2 = setInterval(() =>calculateAndDisplayRoute(points,directionsService,directionsRenderer,map),3000);
        }
      });
      $(switTogle).change(function(){
        if(this.checked){
            directionsRenderer.setMap(map);
            $("#route").display="";
                $("#route").html("Total path: "+parseInt(distance/1000)+" km.")
        }
        else{
            directionsRenderer.setMap(null);
            $("#route").display="block";
                $("#route").html("")
        }
    });
}
var routeActiv=false;
var switTogle=document.getElementById("flexSwitchCheckDefault");
var distance=0;
function calculateAndDisplayRoute(points,directionsService,directionsRenderer,map){
    i++;
    
    var waypoints=[];
    var start={lat: points[0].coords.lat, lng: points[0].coords.lng};
    var finish={lat: points[i].coords.lat, lng: points[i].coords.lng}; 
    if(i>1){
        for(let a=1;a<i;a++){
            waypoints.push({location:{lat: points[a].coords.lat, lng: points[a].coords.lng}});
        }
    }
    var x;
    directionsService
              .route({
                origin:  start ,
                waypoints: waypoints,
                destination:  finish,
                travelMode: google.maps.TravelMode.DRIVING,
              })
              .then((response) => {
                directionsRenderer.setDirections(response);
                x=response.routes[0].legs[response.routes[0].legs.length-1].distance.value;
                distance=distance+response.routes[0].legs[response.routes[0].legs.length-1].distance.value;
                
              })
              if(i==1){
                directionsRenderer.setMap(map);
              }
              if(i==4){
                clearInterval(timer2);
                routeActiv=false;
                switTogle.disabled=false;
                switTogle.checked=true;    
                setTimeout(function(){
                    $("#route").display="";
                $("#route").html("Total path: "+parseInt((distance)/1000)+" km.");
                }, 1000);
                
            }

    }



function findPhotos(value,points){
    actualData.length=0;
    data.forEach(element => {
        if (element.coords.lng===points[(value[0]-1)].coords.lng){
            actualData.push(element)
        }
    });
    
    console.log(actualData);
    makeCont();
}
var cusCon=document.getElementById("customCon");
var columnsDiv =[]
var mapa=document.getElementById("bigMap");
var moda=document.getElementById("mod1");
function makeCont(){
    if (actualData.length===1){
        indexSlaid=0;
        modala.style.display="block";
        actualImages.length=0;
        let tempImg=document.createElement("img");
        tempImg.src="../"+actualData[0].direction+'/'+actualData[0].name;
        tempImg.alt=actualData[0].title;
        actualImages.push(tempImg);
        startGalery();
    }
    else{
        makeContent("../");
        moda.style.display="block";
    }
    
}

moda.addEventListener("click",(event)=>{
if (event.path[0].tagName!="IMG"){
    actualData.length=0;
    makeContent("../");
    moda.style.display="none";
}
});
