video="";
status="";
objects=[];
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function start(){
    objectdetector=ml5.objectDetector("cocossd",modalloaded);
    document.getElementById("status").innerHTML="status:Detecting Objects";
    objectname=document.getElementById("objectname").value;
}

function modalloaded(){
    console.log("modalloaded");
    status=true;
}

function draw(){
    image(video,0,0,480,380);
    if(status!="")
    {
        objectdetector.detect(video,getresult);
        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="objectdetected";
            fill("cyan");
            percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x+7,objects[i].y+15);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        noFill();
        stroke("cyan");
        if(objects[i].label==objectname){
            objectdetector.detect(getresult);
            document.getElementById("status").innerHTML="object found";
            video.stop();
        }
        else{
            document.getElementById("status").innerHTML="object not found";
            
        }
        }
    }
}
function getresult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
objects=results;
}