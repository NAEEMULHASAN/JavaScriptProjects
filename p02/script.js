const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.occupied)');
const count=document.getElementById('count');
const total=document.getElementById('total');
const movieSelect=document.getElementById('movie');
let ticketPrice=movieSelect.value;

populateUI();

//Function to pull data from localstorage to build UI

function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedSeats'));
     if(selectedSeats !==null &&  selectedSeats.length > 0 ){
         seats.forEach( ( seat,index) => {
             if(selectedSeats.indexOf(index) > -1 ){
                 seat.classList.add('selected');
             }
         });
     }
     const selectMovieIndex=localStorage.getItem('selectedMovieIndex');
     if(selectMovieIndex !==null ){
        movieSelect.selectedIndex=selectMovieIndex;
    }
}


 
//Function to save movie data
function setMovieData(movieIndex,moviePrice){
localStorage.setItem('selectMovieIndex',movieIndex);
localStorage.setItem('selectMoviePrice',moviePrice);
}

//Functions to update selected counts

function updateSelectedCount(){
    const selectedSeats=document.querySelectorAll('.row .seat.selected');
    const countSelectedSeats = selectedSeats.length;
    const seatsIndex= [...selectedSeats].map(seat=> [...seats].indexOf(seat));
           
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    count.innerHTML=countSelectedSeats;
    total.innerHTML=ticketPrice*countSelectedSeats;
}
//Event Listener  for change on select movie drop down
movieSelect.addEventListener('change',(e)=>{

    ticketPrice=+e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();

})

//Event Listeners for click on available seats
container.addEventListener('click',(e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCount();

    }
});

//calculate initial number of seats & total price
updateSelectedCount();