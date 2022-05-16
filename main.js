songs="";
rightWristX="";
rightWristY="";
leftWristX="";
leftWristY="";
scoreLeftWrist="";
scoreRightWrist="";
function preload(){
    songs=loadSound("music.mp3")
}
 function setup(){
     canvas=createCanvas(450,450);
     canvas.center()

     video=createCapture(VIDEO)
     video.hide()

     PoseNet=ml5.poseNet(video,modelLoaded);
     PoseNet.on("pose",gotPoses);
 }

 function modelLoaded(){
     console.log("Model Loaded Successfully")
 }

 function gotPoses(results){
if(results.length>0){
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("RightWristX=" +rightWristX +"RightWristY="+rightWristY);
    scoreRightWrist=results[0].pose.keypoints[10].score;
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("ScoreRightWrist="+scoreRightWrist+"ScoreLeftWrist="+scoreLeftWrist);

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("LeftWristX="+leftWristX+"LeftWristY="+leftWristY);
}
 }
 function draw(){
     image(video,0,0,450,450);

     fill("red");
     stroke("black");

     if(scoreRightWrist>0.2){
         circle(rightWristX,rightWristY,20)
         if(rightWristY>0 && rightWrist <=100){
      document.getElementById("speed").innerHTML="speed=0.5x"
      song.rate(0.5);
         }
         else if(rightWristY>100 && rightWrist <=200){
        document.getElementById("speed").innerHTML="speed=1x"
        song.rate(1);
         }
         else if(rightWristY>200 && rightWrist<=300){
             document.getElementById("speed").innerHTML="speed=1.5x"
             song.rate(1.5);
         }
         else if(rightWristY>300 && rightWrist<=400){
             document.getElementById("speed").innerHTML="speed=2x"
             song.rate(2);
         }
         else if(rightWristY>400){
             document.getElementById("speed").innerHTML="speed=2.5"
            song.rate(2.5);
         }
     }

     if(scoreLeftWrist>0.2){
         circle(leftWristX,leftWristY,20);
         InNumberLeftWrist=Number(leftWristY);
         remove_decimal=floor(InNumberLeftWrist);
         volume=remove_decimal/500;
         document.getElementById("volume").innerHTML="volume"+volume;
         song.setVolume(volume);
     }

 }
 function play(){
     songs.play()
     songs.setVolume(1);
     songs.rate(1);
 }