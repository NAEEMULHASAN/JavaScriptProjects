//Getting the  DOM Elements from html file
const balance=document.getElementById('balance');
const money_plus=document.getElementById('money-plus');
const money_minus=document.getElementById('money-minus');
const list=document.getElementById('list');
const form=document.getElementById('form');
const discription=document.getElementById('discription');
const amount=document.getElementById('amount');

//Dummy Transactions

const dummyTransactions=[
    {id: 1, discription: 'salary', amount: 150000},
    {id: 2, discription: 'Electric Bill', amount: -50000} ,
    {id: 3, discription: 'Internet Bill', amount: -10000},
    {id: 4, discription: 'Profit', amount: 50000}
];

let transactions=dummyTransactions;

//Generate ID function
function generateID(){
    return Math.floor(Math.random()*100000000);
}
//Add new transaction from form

function addTransaction(e){
    e.preventDefault();

    if(discription.value.trim()==='' || amount.value.trim()===''){
        alert('please enter a valid discription  & transaction amount.')

    }
    else {
        const transaction={
            id: generateID(),
            discription: discription.value,
            amount: +amount.value,

        };
        transactions.push(transaction);
        addTransactionUI(transaction);
        updateSums();
        discription.value='';
        amount.value='';

    }

}

//Function to delete a transaction

function deleteTransaction(id){
    transactions=transactions.filter(transaction => transaction.id!=id);
    init();

}

//Function to display transaction in transaction history

function addTransactionUI(transaction){

    //classify if income or expense

    const type=transaction.amount > 0 ? '+':'-';

    //Create DOM elemnt for list item

    const item=document.createElement('li');
    item.classList.add(transaction.amount > 0 ? 'plus' : 'minus');
    item.innerHTML=`
    ${transaction.discription}
    <span>${type}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(item);

}
//function to update ballance, income & expense summereis
function updateSums(){
    //Create array  of transactions amount from transaction array
    const amounts=transactions.map(transaction => transaction.amount);
   
   //calculate total value ballance
    const total=amounts
               .reduce( (acc,amount) => ( acc+=amount ),0)
               .toFixed(2);
    //Calculate total income
    const income=amounts
                .filter( amount => amount > 0)
                .reduce( (acc,amount) => (acc+=amount),0)
                .toFixed(2);
    //Calculate total expense
    const expense=amounts
                  .filter( amount => amount < 0)
                  .reduce( (acc,amount) => (acc+=amount),0)
                  .toFixed(2);
    //Update balance in DOM
    
    balance.innerText=`${total} PKR`

    //Update income in DOM
    money_plus.innerText=`${income} PKR`

//Update expense in DOM
money_minus.innerText=`${expense} PKR`
    
}

//Function to initialize the app

function init(){
    list.innerHTML='';
    transactions.forEach(addTransactionUI);
    updateSums();
}

//event listener

//1-eventlistneres for form submit

form.addEventListener('submit',addTransaction);

init();