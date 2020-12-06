//Grab DOM elements from html
const word=document.getElementById('word');
const wrongeLetters=document.getElementById('wrongeLetters');
const popup=document.getElementById('popup-container');
const message=document.getElementById('win-lose');
const restartButton=document.getElementById('restart');
const notification=document.getElementById('slider-container');
const hangmanParts=document.querySelectorAll('.HangmanParts');
//Pool of  words  or   array  for  select random word
const wordPool=['javascript','computer','hangman','facebook','youtube'];
//Formula  for  random word selection
let selectedWord=wordPool[Math.floor(Math.random()*wordPool.length)];

//Array  to  classify user input

const correctLetters=[];

const incorrectLetters=[];

//Create  Funtions

//Function to display selected word on screen

function displaySelectedWord(){
   word.innerHTML=`
   ${selectedWord.split('').map(
       letter =>` <span class="letter">
           ${correctLetters.includes(letter) ? letter: ''}
       </span>
       `
   ).join('')
}
      
   `;
   const wordText=word.innerText.replace(/\n/g,'');
   if( wordText === selectedWord ){
       message.innerText='You Won!';
       popup.style.display='flex';

   }
};

//Function to Display  sliding notification

function showNotification(){
    notification.classList.add('show');
    setTimeout(()=>{  notification.classList.remove('show');},3000
    );

    

}

//Function to udate incorrect letters

//update the display for wrong letters

function  updateWrongeLetters(){

    wrongeLetters.innerHTML=` 
            ${incorrectLetters.length > 0 ? `<p>Wrong</p>` : ' ' }
            ${incorrectLetters.map(letter => `<span>${letter}</span> ` )}
    
    `;
//display hangman part on incorrect letter inut
    hangmanParts.forEach((part,index )=>{
        const errors=incorrectLetters.length;

if(index < errors){
        part.style.display='block';

    }else{
        part.style.display='none';
    }

        
    });
    //show popup if lost
    if(incorrectLetters.length===hangmanParts.length){
        message.innerText='You lost!';
        popup.style.display='flex';

    }
    
}

//Event Handlers

//1-Event Handler for key board input
window.addEventListener('keydown',e =>{
    if(e.keyCode >= 65 && e.keyCode <= 90 ){
        const letter=e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displaySelectedWord();


            } else{
                showNotification();     
            }

        } else {
            if(!incorrectLetters.includes(letter)){
                incorrectLetters.push(letter);
                updateWrongeLetters();
            } else{
                showNotification(); 
            }
        }

    }
})

//2-Event Listener for restart button

restartButton=document.addEventListener('click',()=>{
    //Empty arrays
    correctLetters.splice(0);
    incorrectLetters.splice(0);
   
    //Get a new selected word from the pool

    selectedWord=wordPool[Math.floor(Math.random()*wordPool.length)];

    displaySelectedWord();
    //clear the wrong letter div
    updateWrongeLetters();
     
    //Hide the popup

    popup.style.display='none';

})

displaySelectedWord();
