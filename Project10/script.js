//Getting the DOM Elements
const musicContainer=document.getElementById('music-container');
const progressContainer=document.getElementById('progress-container');
const playButton=document.getElementById('play');
const nextButton=document.getElementById('next');
const prevButton=document.getElementById('prev');
const progressBar=document.getElementById('progress');
const cover=document.getElementById('cover');
const audio=document.getElementById('audio');
const title=document.getElementById('title');

//List of songs

const songList=['Jeene-Laga-Hoon','Main-Rang-Sharbaton','Pehli-Nazar-Mein','Sanam-Gulabi-Aankhen','Sanam-Lag-Ja-Gale','Aaj Janey',
                 'Mere Watan','Sanam-Mere-Mehboob','Sanam-O-Mere-Dil-Ke-Chain','Tere-Sang-Yaara','Yeh-Reshmi-Zulfein',
                 'Abhi Na'];

//Track which song is currently playing

let currentSong=1;

//Update the song to the DOM
function loadSong(song){
    title.innerText=song;
    audio.src=`music/${song}.mp3`;
    cover.src=`images/${song}.jpg`;
}

//funtion to play the song

function playSong(){
    musicContainer.classList.add('play');
    playButton.querySelector('i.fas').classList.remove('fa-play');
    playButton.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

//Function to pause the song
function pauseSong(){
    musicContainer.classList.remove('play');
    playButton.querySelector('i.fas').classList.remove('fa-pause');
    playButton.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

//Function to switc to previous song

function prevSong(){

    currentSong--;
    if(currentSong < 0){

        currentSong = songList.length-1;
        
    }
    loadSong( songList[ currentSong ]);

    playSong();
}

//Function to switch to next sog
function nextSong(){

    currentSong++;
    if(currentSong > songList.length-1){

        currentSong=0;

        
        
    }
    
    loadSong( songList[ currentSong ]);

    playSong();
}

//Function to update time 

function updateProgress(e) {
    const {currentTime,duration}=e.srcElement;
    const progressPercentage=(currentTime / duration) * 100;
    progressBar.style.width=`${progressPercentage}%`
    
}

// Set the Progress Bar
function setProgress(e) {
    const width = this.clientWidth;
    const offsetX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = ( offsetX / width ) * duration;
}





//Initial Song Load

loadSong( songList[ currentSong ]);

//Event Listeners

//1-Play Button event listner

playButton.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }

});

//2-Pause button EeventListener

prevButton.addEventListener('click',prevSong());


//3-Next button EeventListener

nextButton.addEventListener('click',nextSong);

// 4. Update the Time for Song Play
audio.addEventListener('timeupdate', updateProgress);

// 5. Update the Time for Song Play based on Click on Progress Container
progressContainer.addEventListener('click', setProgress);

// 6. Automatically Play Next Song
audio.addEventListener('ended', nextSong);
