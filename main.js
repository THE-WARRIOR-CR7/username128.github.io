song1 = " ";
song2 = " ";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWrist_score = 0;
rightWrist_score = 0;
song1Status=" ";
song2Status=" ";
function preload() {
    song1 = loadSound("avengers.mp3");
    song2 = loadSound("pirates.mp3");
}

function draw() {
    image(video, 0, 0, 600, 475);
    song1Status=song1.isPlaying();
    song2Status=song2.isPlaying();
    fill("#ff0000");
    stroke("#ff0000");
    if (leftWrist_score>0.2) {
        circle(leftWristX,leftWristY,20);
   song2.stop();
   if (song1Status == false) {
song1.play();
document.getElementById("song").innerHTML="Avengers Theme song is playing";
   }
     }if (rightWrist_score>0.2) {
        circle(rightWristX,rightWristY,20);
        song1.stop();
   if (song2Status == false) {
song2.play();
document.getElementById("song").innerHTML="Pirates song is playing";
   }
}
} 

function setup() {
    canvas = createCanvas(600, 475);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function play() {
    song1.play();
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("left wrist values ", leftWristX, leftWristY);
        console.log("right wrist values ", rightWristX, rightWristY);
        leftWrist_score = results[0].pose.keypoints[9].score;
        rightWrist_score = results[0].pose.keypoints[10].score;

    }
}