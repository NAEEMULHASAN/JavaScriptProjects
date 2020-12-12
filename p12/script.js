//Settings DOM Elements
const settingsBtn=document.getElementById('settings-btn');
const settings=document.getElementById('settings');
const settingsForm=document.getElementById('settings-form');
const settingsDifficulty=document.getElementById('difficulty');

//Score & Time DOM
const scoreElement=document.getElementById('score');
const timeElement=document.getElementById('time');

//word & text inut DOM elemtns

const word=document.getElementById('word');
const text=document.getElementById('text');

//end game container DOM Element
const endGameElement=document.getElementById('end-game-container');

//pool of words for the game
const wordList=[  
'a','ability','able','about',   'above',    'accept',   'according',    'account',  'across',   'act',  'action',   'activity', 'actually', 'add',  'address',  'administration',   'admit',    'adult',    'affect',   'after',    'again',    'against',  'age',  'agency',   'agent',    'ago',  'agree',    'agreement',    'ahead',    'air',  'all',  'allow',    'almost',   'alone',    'along',    'already',  'also', 'although', 'always',   'American', 'among',    'amount',   'analysis', 'and',  'animal',   'another',  'answer',   'any',  'anyone',   'anything', 'appear',   'apply',    'approach', 'area', 'argue',    'arm',  'around',   'arrive',   'art',  'article',  'artist',   'as',   'ask',  'assume',   'at',   'attack',   'attention',    'attorney', 'audience', 'author',   'authority',    'available',    'avoid',    'away', 'baby', 'back', 'bad',  'bag',  'ball', 'bank', 'bar',  'base', 'be',   'beat', 'beautiful',    'because',  'become',   'bed',  'before',   'begin',    'behavior', 'behind',   'believe',  'benefit',  'best', 'better',   'between',  'beyond',   'big',  'bill', 'billion',  'bit',  'black',    'blood',    'blue', 'board',    'body', 'book', 'born', 'both', 'box',  'boy',  'break',    'bring',    'brother',  'budget',   'build',    'building', 'business', 'but',  'buy',  'by',   'call', 'camera',   'campaign', 'can',  'cancer',   'candidate',    'capital',  'car',  'card', 'care', 'career',   'carry',    'case', 'catch',    'cause',    'cell', 'center',   'central',  'century',  'certain',  'certainly',    'chair',    'challenge',    'chance',   'change',   'character',    'charge',   'check',    'child',    'choice',   'choose',   'church',   'citizen',  'city', 'civil',    'claim',    'class',    'clear',    'clearly',  'close',    'coach',    'cold', 'collection',   'college',  'color',    'come', 'commercial',   'common',   'community',    'company',  'compare',  'computer', 'concern',  'condition',    'conference',   'Congress', 'consider', 'consumer', 'contain',  'continue', 'control',  'cost', 'could',    'country',  'couple',   'course',   'court',    'cover',    'create',   'crime',    'cultural', 'culture',  'cup',  'current',  'customer', 'cut',  'dark', 'data', 'daughter', 'day',  'dead', 'deal', 'death',    'debate',   'decade',   'decide',   'decision', 'deep', 'defense',  'degree',   'Democrat', 'democratic',   'describe', 'design',   'despite',  'detail',   'determine',    'develop',  'development',  'die',  'difference',   'different',    'difficult',    'dinner',   'direction',    'director', 'discover', 'discuss',  'discussion',   'disease',  'do',   'doctor',   'dog',  'door', 'down', 'draw', 'dream',    'drive',    'drop', 'drug', 'during',   'each', 'early',    'east', 'easy', 'eat',  'economic', 'economy',  'edge', 'education',    'effect',   'effort',   'eight',    'either',   'election', 'else', 'employee', 'end',  'energy',   'enjoy',    'enough',   'enter',    'entire',   'environment',  'environmental',    'especially',   'establish',    'even', 'evening',  'event',    'ever', 'every',    'everybody',    'everyone', 'everything',   'evidence', 'exactly',  'example',  'executive',    'exist',    'expect',   'experience',   'expert',   'explain',  'eye',  'face', 'fact', 'factor',   'fail', 'fall', 'family',   'far',  'fast', 'father',   'fear', 'federal',  'feel', 'feeling',  'few',  'field',    'fight',    'figure',   'fill', 'film', 'final',    'finally',  'financial',    'find', 'fine', 'finger',
]

//Initialie variables
//1-Initialie word to dislay

let randomWord;

//2-Initialize time

let time=60;

//3-Initialize score

let score=0;

//4-Initialize difficulty
let difficulty=localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

settingsDifficulty.value=localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';



//on page load,focus on the text input so user can type

text.focus();

//start the time counter

const timeInterval = setInterval( updateTime, 1000);



//Functions

//1-Function to generate random word
function generateRandomWord(){

    return wordList[ Math.floor(Math.random()*wordList.length) ];

}

//2-Function to add random word in DOM

function addWordToDom(){
    randomWord=generateRandomWord();
    word.innerHTML=randomWord;
}

//3-Function to update the score
function updateScore() {
    score++;   
    scoreElement.innerHTML=score;   
}

//4-Function to update the time

function updateTime(){
    time--;
    timeElement.innerHTML= `${time}s`;
    if( time === 0 ){
        //stop timer at 0
        clearInterval(timeInterval);
        //end game container by showing end game container
        gameOver();
    }
}
//5-Function to end the game

function gameOver(){
    endGameElement.innerHTML=`
    <h1>The clock has run out!</h1>
    <p>Your score is ${score}</p>
    <button onClick="window.location.reload()">Play Again</button>
    `
    endGameElement.style.display='flex';


}

addWordToDom();

//Add EventListeers

//1-EventListener on text input
text.addEventListener('input',(e) => {
    //Get iput from user typed word
    const typedTex=e.target.value;
    //check if user input match with randomword
    if( typedTex === randomWord ){
        //display new random word

        addWordToDom();

        //update score
        updateScore();

        
        

        //clear the input feild

        e.target.value = ''

        //add more time to the clock based on difficlty

        if (difficulty === 'easy'){
            time+=5;

        } else if(difficulty === 'medium'){
            time+=4;

        } else {
            time+=3;

        };
       
        updateTime();
    }
});

//2-when  clicking setting button
settingsBtn.addEventListener('click',() => {
    settings.classList.toggle('hide');
})

//3-when changing difficulty settings

settingsForm.addEventListener('change',(e) => {
    const difficulty=e.target.value;
    localStorage.setItem('difficulty',difficulty);



})