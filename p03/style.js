




const video=document.getElementById('video');
const play=document.getElementById('play');
const stop=document.getElementById('stop');
const progress=document.getElementById('progress');
const timestamp=document.getElementById('timestamp');
//Functions
//1-toggleVideo-play or pause video
//if video is playing ,then pause
//if video is paused ,then play
function toggleVideo(){
    if (video.paused) {
        video.play();
        
    } else {
        video.pause();
    }
         
    };

//2-UpdateIcon-toggle between play & pause
//if video playing , then show pause icon
//if video stop, then show play icon

function updateIcon(){
    if(video.paused){
        play.innerHTML='<i class="fas fa-play fa-2x"></i>';
    } else {
        play.innerHTML='<i class="fas fa-pause fa-2x"></i>';
    }
};
//3-update Progress -update the position of the progress bar
function updateProgress(){
    //update slider
    progress.value = value.currentTime/video.duration*100;
    //update timestamp
    //rounding down the minutes
    let minutes=Math.floor(video.currentTime / 60);
    if(minute < 10){
       minutes=`0${minutes}`;
    }
    //rounding down the seconds
    let seconds=Math.floor(video.currentTime % 60);
    if(seconds < 10){
       seconds=`0${seconds}`;
        
    }
    //display timestamp
    timestamp.innerHTML=`${minutes}:${seconds}`;
};

//4-stopVideo-stop video plauback and reset time to 0
function stopVideo(){
    video.pause();
    video.currentTime=0;
};
//5-setProgress-update video playback time based on manual change bar
function setProgress(){
    video.currentTime = progress.value*video.duration / 100;
};


//Event Listeners
//1-Video Element- click to play or pause video
video.addEventListener('click',toggleVideo);

//2-video Element - pause to toggle play icon to pasuee
video.addEventListener('pause',updateIcon);

//3-video Element -play to toggle pause icon back to play
video.addEventListener('play',updateIcon);

//4-video Elelent- update progress bar and timestamp
video.addEventListener('timeupdate',updateProgress);

//5-play Buuton- click to play or pause video
play.addEventListener('cick',toggleVideo);

//6-stop Button- click to reset video and pause video
stop.addEventListener('click',stopVideo);

//7-progress Bar - change position to change time to playback

progress.addEventListener('change',setProgress);























