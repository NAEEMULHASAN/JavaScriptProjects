//Get all DOM elements for fuctionality
//card container
const cardContainer=document.getElementById('card-container');
//Navigatio
const prevBtn=document.getElementById('prev-btn');
const nextBtn=document.getElementById('next-btn');
const currentCard=document.getElementById('current-card');
const addNewCardBtn=document.getElementById('add-card-btn');
//Add  card container
const addCardContainer=document.getElementById('add-card-container');
const  addCardBtn=document.getElementById('add-card');
const closeCardBtn=document.getElementById('close-card');
const question=document.getElementById('question');
const answer=document.getElementById('answer');

//clear cards
const clearBtn=document.getElementById('clear-btn');
//track current card

let currentActiveCard = 0;

//collection of card DOM Elements

const cardElements = [];

//collection of card data

const cardsData =getCardsData();
    

//Functions
//1.Function to create card
function createCards(){
    cardsData.forEach( (data,index) => createCard(data,index));
}

//2.Funstion to create a card
function createCard(data,index){
    //create the div for the card
    const card=document.createElement('div');
    //assign the card class
    card.classList.add('card');
    //check the first card and assign active class
    if( index === 0 ){
        card.classList.add('active');
    }

        //create the innerHTML for the card
        card.innerHTML=`

                <div class="inner-card">
                   <div class="card-front">
                    <p>${data.question}</p>
                   </div>
                   <div class="card-back">
                    <p>${data.answer}</p>

                </div>
                </div>
                `;
                //Event listener to flip the card on clickk
                
                card.addEventListener('click', () => card.classList.toggle('show-answer'));
                //add the newly created card to the collection of card DOM element
                cardElements.push(card);

                //add the card to the DOM
                cardContainer.appendChild(card);
                //Display the current card/Total card value
                updateCurrentCardText();

               }

    




//3.function to show the current card/total number of card o avigation
function updateCurrentCardText(){

    currentCard.innerHTML=`<P>${currentActiveCard +1}/${cardElements.length}</P>`;

}
//4.Function to get cards data from local storage
function getCardsData(){
    const cards=JSON.parse(localStorage.getItem('cards'));
    return cards === null ? []: cards; 

} 
//5. Function to save card data to local storage
function saveCardData(cards){
    //save card data to localstorage
    localStorage.setItem('cards',JASON.stringify(cards));
    //reload window
    window.location.reload();


}
createCards();

//Event Listeers

//1.Event Listner for next btn
nextBtn.addEventListener('click',() => {
    //hide the current card ad move to let
    cardElements[currentActiveCard].className='card left';
    //icremet curret active card
    currentActiveCard++;
    //check if last card
    if( currentActiveCard > cardElements.length-1 ){
    currentActiveCard = cardElements.length-1;
    }
    //display the new card
    cardElements[currentActiveCard].className='card active'
    //update the current card number
    updateCurrentCardText();

       
})

//2.Event Listner for previus btn
prevBtn.addEventListener('click',() => {
    //hide the current card ad move to right
    cardElements[currentActiveCard].className='card right';
    //icremet curret active card
    currentActiveCard--;
    //check if last card
    if( currentActiveCard < 0 ){
    currentActiveCard = 0;
    }
    //display the new card
    cardElements[currentActiveCard].className='card active'
    //update the current card number
    updateCurrentCardText();

       
})

//3. Create Event Lister for the add new card btn

addCardBtn.addEventListener('click',() => {
    addCardContainer.classList.add('show');
})

//4.close the add new card btn
closeCardBtn.addEventListener('click',() => {

    addCardContainer.classList.remove('show');
})

//5.event Lister for add new Card btn

addNewCardBtn.addEventListener('click',() => {
    //get the user input from text 
    const questionInput=question.value;
    const answerInput=answer.value;
    //check inputs are not null
        if( questionInput.trim() && answerInput.trim() ){
            //creatig new object using user input
        const newCard={ question: questionInput,answer: answerInput }

        createCard(newCard);

   //reset form fields
    question.value='';
    answer.value='';
    //hide form after submit
    addCardContainer.classList.remove('show');
    //add the new  card object to the cardsData  array
    cardsData.push(newCard); 
    //save data to localstorage & reload

    saveCardData(cardsData);
      }
    

})

//6.Event lister to clear all cards

clearBtn.addEventListener('click',() => {
    //remove data from localstorage
    localStorage.clear();
    //clear the card container of all cotents 
    cardContainer.innerHTML='';
    //reload the window
    window.location.reload;
   //currentCard.innerHTML='<p></p>'
})

