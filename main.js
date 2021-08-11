img = "";
status = "";
objects = [];
function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video=createCapture(VIDEO);
  video.size(380,380);
  video.hide();
  objectdetector = ml5.objectDetector("cocossd", modelloaded);
  document.getElementById("status").innerHTML = "status: detecting objects";
}
function preload() {
  sound=loadSound("alert.mp3");
}
function draw() {
  image(video, 0, 0, 380, 380);
 
    objectdetector.detect(video, gotresult);
    for (i = 0; i < objects.length; i++) {
      if(objects[i].label == "person"){
        document.getElementById("status").innerHTML = "status: Baby detected";
        sound.stop();
      }
      else{
        document.getElementById("status").innerHTML = "status: Baby not detected";
        sound.play();
      }
    }
  }
function modelloaded() {
  console.log("Model loaded");
  status = true;
  
}
function gotresult(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
    objects = results;
  }
}
