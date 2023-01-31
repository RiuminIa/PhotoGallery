//create DIv and Img from JSON Data
var columnsDiv =[]
var actualData =[]
var actualImages=[]
function makeContent(appendix){
    for (let i=0;i<3;i++){
        let a=document.getElementById("column"+(i+1))
        columnsDiv.push(a);
    }
    actualImages.length=0;
    try{
        columnsDiv.forEach(val=>{
            val.innerHTML = '';
        })
    }
    catch(error){
    }

    for(let i=0;i<actualData.length;i++){
        let tempDiv=document.createElement("div");
        tempDiv.className="imgRow";
        let tempImg=document.createElement("img");
        tempImg.src=appendix+actualData[i].direction+'/'+actualData[i].name;
        tempImg.alt=actualData[i].title;
        actualImages.push(tempImg);
        tempDiv.appendChild(tempImg);
        columnsDiv[parseInt(i%3)].appendChild(tempDiv);   
    }
}
var indexSlaid=0;
var customCon=document.getElementById("customCon");
var modala=document.getElementById("mod");
var modalaContent=document.getElementById("modC");
var starPresent=false;

customCon.addEventListener("click",(event)=>{
    console.log("dsadsaf")
    a=event.path[0].tagName;
    if(a=="IMG"){
        indexSlaid=actualImages.findIndex((x)=>x===event.path[0]);
        modala.style.display="block";
        console.log(event.path[0].tagName);
        startGalery();
    }
})

var activImage=null;
function startGalery(){
    let tempImg=document.createElement('img');
    activImage=tempImg;
    tempImg.src=actualImages[indexSlaid].src;
    tempImg.alt=actualImages[indexSlaid].alt;
    tempImg.className="";
    tempImg.style.width="100%";
    setSize();
    console.log(tempImg);
    modalaContent.appendChild(tempImg);
    // let x=initMap();
    let data=new Date(actualData[indexSlaid].date);
    $("#modalText").html("<h2>"+actualData[indexSlaid].title+"</h2>"+"<p>"+actualData[indexSlaid].description+"</p>"+"<time>"+data.toUTCString()+"</time>");
    if (flagGaleri){
        $("#modalText").append(initMap());
    }
}
window.addEventListener('resize', function(event) {
    if (activImage!=null){
        setSize();
    }
});

function setSize(){
    if(activImage.naturalWidth/activImage.naturalHeight>=window.innerWidth/window.innerHeight){
        modalaContent.style.width="95%";
    }
    else{
        let x=activImage.naturalHeight/activImage.naturalWidth;
        x=parseInt(window.innerHeight/(x*8.04));
        console.log(x+"vh");
        modalaContent.style.width=x+"vh";
    }
}

$("#closed").click(function(){
    var activImage=null;
    if(timerId!=0){
        clearInterval(timerId);
    }
    starPresent=false;
    modalaContent.removeChild(modalaContent.lastChild);
    $("#bottom").html("&#9656;");
    modala.style.display="none";
    
});
$("#left").click(function(){
    modalaContent.removeChild(modalaContent.lastChild);
    indexSlaid--;
    if(indexSlaid<0){
        indexSlaid=actualData.length-1;
    }
    startGalery();
});
$("#right").click(function(){
    modalaContent.removeChild(modalaContent.lastChild);
    indexSlaid++;
    indexSlaid=indexSlaid%actualData.length;
    startGalery();
});
var timerId=0;
$("#bottom").click(function(){
    starPresent=!starPresent;
    if (starPresent){
        $("#bottom").html("&#9642;");
        timerId = setInterval(() => $("#right").trigger("click"), 3000);
    }
    else{
        $("#bottom").html("&#9656;");
        clearInterval(timerId);
        timerId=0;
    }
});