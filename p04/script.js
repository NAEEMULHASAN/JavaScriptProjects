//getting element from DOM
const currencyOnePicker=document.getElementById('currency-one');

const currencyTwoPicker=document.getElementById('currency-two');

const currencyAmmountOne=document.getElementById('amount-one');

const currencyAmmountTwo=document.getElementById('amount-two');

const flipButton=document.getElementById('flip');

const rate=document.getElementById('rate');

//fetch exchange rate from third party API & UPDATE DOM
//www.exchangerate-api.com



function calculate(  ) {
     const currencyOneCode=currencyOnePicker.value;

     const currencyTwoCode=currencyTwoPicker.value;

     fetch(` https://v6.exchangerate-api.com/v6/a15a6f5453803e5073ab1d16/latest/${ currencyOneCode}`)
     .then(res=>res.json() )
     .then(data => {
        //Get the  exchange rate from API Data 
        const exchangeRate=data.conversion_rates[currencyTwoCode];
         
         //Dispaly the conversion rate
         rate.innerText=`1 ${currencyOneCode}=${exchangeRate} ${currencyTwoCode}`;
     
    
    
//Apply conversion rate and update currencyAmountTwo
         currencyAmmountTwo.value=(currencyAmmountOne.value*exchangeRate).toFixed(2);
     }) ;
    }

     //Flip fucntion for flip button to switch currency pair
    
    function flip( ) {
        const temp=currencyOnePicker.value;
        currencyOnePicker.value=currencyTwoPicker.value;
        currencyTwoPicker.value=temp;
        console.log(currencyOnePicker.value);
        console.log(currencyTwoPicker.value);

        calculate();


    };




//Event Listeners
currencyOnePicker.addEventListener('change',calculate);

currencyTwoPicker.addEventListener('change',calculate);

currencyAmmountOne.addEventListener('input',calculate);

currencyAmmountTwo.addEventListener('input',calculate);

flipButton.addEventListener('click',flip);


calculate();
