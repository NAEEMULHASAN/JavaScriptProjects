//Get  all  DOM Elements required
//HTML5 Main element for the grid

const main = document.getElementById('main');
// Select box for changing voices
const voiceSelect = document.getElementById('voices');
// Toggle button to display custom text input
const toggleBtn = document.getElementById('toggle');
// Button to close the custom text div
const closeBtn = document.getElementById('close');
// Text area for custom text input
const customText = document.getElementById('text');
// Button to read the custom text input
const readBtn = document.getElementById('read');
// Custom Text Div
const customTextDiv = document.getElementById('custom-text');

//Array for holding all images and text to be read
const data=[
    { 
        image: './img/angry.jpg',
        text: "I'm Angry "
    },
    { 
        image: './img/depressed.jpg',
        text: "I'm depress "
    },
    { 
        image: './img/happy.jpg',
        text: "I'm Happy "
    },
    { 
        image: './img/sad.jpg',
        text: "I'm Sad "
    },
    { 
        image: './img/tired.jpg',
        text: "I'm Tired "
    },
    { 
        image: './img/busy.jpg',
        text: "I'm Busy"
    },
    { 
        image: './img/drive.jpg',
        text: "I'm driving"
    },
    { 
        image: './img/drink.jpg',
        text: "I'm Thirsty "
    },


{ 
        image: './img/school.jpg',
        text: "I'm in school "
    },
    { 
        image: './img/exercise.jpg',
        text: "I'm  doing exercise "
    },
    { 
        image: './img/cook.jpg',
        text: "I'm cooking today"
    },
    { 
        image: './img/travel.jpg',
        text: "I'm Travelingd "
    },
]
// Array for all Web Speech API Voices
let voicesBackup = [];

//create a box for each objrct in the data array
data.forEach(createBox);

// Functions
// 1. Function to create speech boxes
function createBox(imageObj) {
    // Create empty div for the image to be added to the main grid later
    const box = document.createElement('div');
    // Get the image url and text from the data array
    const { image, text } = imageObj;
    // Apply a CSS class to the new div
    box.classList.add('box');
    // Add the image inside the box
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="imageInfo">${text}</p>
    `;
    // Add event for speaking text
    box.addEventListener('click', () => {
        setMessage(text);
        speakText();
    })
    // Add the new box to the DOM
    main.appendChild(box);
}

// Initialize speech synthesis
const message = new SpeechSynthesisUtterance();

// 2. Function to get voices from Web Speech API and put into the select box
function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
      return;
    }
  
    let voices = speechSynthesis.getVoices();
    voicesBackup = voices;
  
    for(var i = 0; i < voices.length; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
      
      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }
  
      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
      voiceSelect.appendChild(option);
    }
  }

// 3. Set the text for speech synthesis
function setMessage(text) {
    message.text = text;
}

// 4. To speak the text
function speakText() {
    speechSynthesis.speak(message);
}

// 5. Function to set the new voice
function setVoice(e) {
    console.log(e.target.value);
    message.voice = voicesBackup.find(voice => voice.name === e.target.value);
}
  
// Execute populateVoiceList function
populateVoiceList();
if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Event Listeners
// 1. Toggle Button
toggleBtn.addEventListener('click', () => {
    customTextDiv.classList.toggle('show');
})

// 2. Close Button in Custom Text Div
closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');
})

// 3. Event Listener when changing voices
speechSynthesis.addEventListener('voiceschanged', populateVoiceList);
voiceSelect.addEventListener('change', setVoice);

// 4. Event Listener for custom text reader
readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})




/*
//Functions
//1.Function to create speech boxes
function createBox(imageObj){
    
    //create the empty div fr the image to be added  in the main grid later
    const box=document.createElement('div'); 
    //get the image url and associated text from data array
    

    const {image,text}=imageObj;
    //Apply a CSS class to the new div
    box.classList.add('box');
    //add image inside the box
    box.innerHTML=`
    <img src="${image}" alt="${text}" />
    <p class="imageInfo" >${text}</p>
    
    `;
    //add event for the speaking text

    
    //Add the new box to the DOM
    main.appendChild(box);
}

//Add Event Listneres
//toggle Btn

toggleBtn.addEventListener('click', () => {
    customTextDiv.classList.toggle('show');
})

// 2. Close Button in Custom Text Div
closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');
})

*/