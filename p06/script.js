// Get DOM elements
const toggle = document.getElementById('toggle');
const open = document.getElementById('open');
const close = document.getElementById('close');
const modal = document.getElementById('modal');

// Add Event Listeners
// 1. Toggle the Nav
toggle.addEventListener('click', () => 
    document.body.classList.toggle('show-nav')
);

// 2. Show the Modal
open.addEventListener('click', () =>
    modal.classList.add('show-modal')
);

// 3. Close the Modal
close.addEventListener('click', () => 
    modal.classList.remove('show-modal')
);

// 4. Close the Modal on Click Outside Modal
window.addEventListener('click', e => 
    e.target === modal ? modal.classList.remove('show-modal') : false
);




/*
//Get DOM Element
const toggle=document.getElementById('toggle');
const open=document.getElementById('open');
const close=document.getElementById('close');
const modal=document.getElementById('modal');


//Add  Event Listener
//1-toggle the nav
toggle.addEventListener=('click',() => 
       document.body.classList.toggle('show-nav')
       
);

//2-show the modal

open.addEventListener=('click',() => 

modal.classList.add('show-modal')

);

//3- close the modal

close.addEventListener('click',() => 
    modal.classList.remove('show-modal')
);

//4-Close the modal when click on outside modal
window.addEventListener('click',e =>
      e.target=== modal ? modal.classList.remove('show-modal') : false
);

*/