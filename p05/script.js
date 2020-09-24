
//Getting DOM elements
const main=document.getElementById('main');
const addUserButton=document.getElementById('add-user');
const doubleMoneyButton=document.getElementById('double');
const showMillionerButton=document.getElementById('show-millioners');
const sortButton=document.getElementById('sort');
const totalButton=document.getElementById('calculate-total');

//Initializing array
let data=[];

//create initial users
generateRandomUser();
generateRandomUser();
generateRandomUser();
generateRandomUser();

//Function to Fetch random user from api
//api  randomuser.me/api

 async function generateRandomUser(){
    const res= await fetch('https://randomuser.me/api');
    const data=await res.json();
    const user=data.results[0];

    const newUser={
        name: `${user.name.first} ${user.name.last}`,
        worth: Math.round(Math.random()*1000000)
    };
    
    addData(newUser);

}

//Add newly Generated user in data Array

function addData(newUser){
    data.push(newUser);
    updateDOM( );
}

//Function to double the worth of each user

function doubleWorth(){
    data=data.map(item => {
        return {...item,worth: item.worth*2 }
    });

    updateDOM();
}
//Function  to sort  richest by worth

function sortRichest(){
    data.sort((a, b) => b.worth - a.worth);

    updateDOM();
}

//Function to show millioners

function showMillioners(){
    data=data.filter(
        item => item.worth > 1000000
   );
    updateDOM();
}

//Function to calculate total networth of  users

function calculateTotalNetWorth(){
    const totalWorth=data.reduce(
        (acc,item) => (acc+=item.worth),0
    );
     
    const totalNetWorthElement=document.createElement('div');

 totalNetWorthElement.innerHTML=`<h3>Total Net Worth<strong>${formatCurrency(totalWorth)} </strong></h3>`;

 main.appendChild(totalNetWorthElement);

}
//Function to update UI with DOM

function updateDOM(inputData=data){
    main.innerHTML='<h2><strong>Name</strong> Net Worth</h2>';
    
    inputData.forEach(item => {

        const element=document.createElement('div');
        element.classList.add('name');
        element.innerHTML=`<strong>${item.name}</strong> ${formatCurrency(item.worth)}`;
        main.appendChild(element);

    });
}

//Function to format a number as a currency

function formatCurrency(num){

    return  'PKR' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

//Add Event Listeners
//Add user eventlistener
 
 addUserButton.addEventListener=('click',generateRandomUser);
//2-Add double money event listener

doubleMoneyButton.addEventListener('click',doubleWorth);

//3-Sort  Richest 

sortButton.addEventListener('click',sortRichest);

//4--Add show millinior event listeners

showMillionerButton.addEventListener('click',showMillioners);

//Add calculate total wealth event listeners

totalButton.addEventListener('click',calculateTotalNetWorth);





