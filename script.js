const startbtn = document.getElementById("startbutton");
const visual = document.getElementById("visual");
const video = document.getElementById("video");
const result = document.getElementById("result");
const info = document.getElementById("info");

//Example : https://teachablemachine.withgoogle.com/models/vEKNNPseP/
const modeURL = "https://teachablemachine.withgoogle.com/models/vEKNNPseP/"
let userface = "";

let classifier = ml5.imageClassifier(modeURL, modelLoaded);

function modelLoaded(){
    console.log("Model Loaded");
    startvideo();
}

async function startvideo(){
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.play();
    classifyface();
}

startbtn.addEventListener("click", () => {
    playgame(userface);
});

function classifyface(gesture){
    classifier.classify(video, (results) => {
        userface = results[0].label;
        gesture.innerText = `Your Gesture ${userface}`;
        classifyface();
    });
}

function playgame(userface){
    Result = "";
    if (userface === "Me") {
        Result = "It's You!";
    } else if (userface === "me and Blaze") {
        Result = "It's Your Pet!";
    }
    result.innerText = `${Result}`;
    visual.innerText = `${""}`;
    info.innerText = `${"Reload The Website to Verify Again"}`;
}

