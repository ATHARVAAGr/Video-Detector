video="";
status="";
objects=[];

function preload()
{
    video=createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas=createCanvas(600,400);
    canvas.position(520,180);
}

function draw()
{
    image(video, 0, 0, 700, 500);

    if(status!="")
    {
        objectDetector.detect(video, gotresults);
        for (i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="status:objects detected";
            document.getElementById("no_of_objects").innerHTML="No of objects detected are: "+ objects.length;
            fill("orange");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+ percent+ "%", objects[i].x+ 15, objects[i].y+ 15);
            noFill();
            stroke("orange");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function Start()
{
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status-Detecting objects";
}

function modelLoaded()
{
    console.log("Model is loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotresults(error,results)
{
  if(error)
  {
      console.log(error);
  }
  else
  {
      console.log(results);
      objects=results;
  }
}