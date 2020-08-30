
//javascript details

const  form=document.getElementById('form');
const  username=document.getElementById('username');
const  email=document.getElementById('email');
const  password=document.getElementById('password');
const  password2 =document.getElementById('password2');
//All functions

//Functions to show error

function showError(input, message){

    const formControl=input.parentElement;
    formControl.className='form-control error';
    const small=formControl.querySelector('small');
    small.innerText=message;
    

}
//function to show success
function showSuccess(input){
    const formControl=input.parentElement;
    formControl.className='form-control success';
}
//function to check valid email
function checkEmail(input){

    
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test( input.value.trim() ) ) {
        showSuccess(input)
        
    } else {
        showError(input,`pls provide valid email`)
    }

}


//function to check field have required data
function checkRequired(inputArray){
    inputArray.forEach(function(input) {
        if(input.value === '') {
            console.log(input.id);
            showError(input,`${getFieldId(input)}  is required `);
            
        } else {
             showSuccess(input);

        }
        
    });
}

    //function to check length of input field

    function checkLength(input, min, max){
        if ( input.value.length < min) {
            showError(input,`${getFieldId(input)} need to be at least ${min} characters`);

            
        }        else if (input.value.length > max) {

            showError(input,`${getFieldId(input)} need to be less then ${max} characters`);
        }else {
           showSuccess(input);
        }
    }
     //Function to check if password & confirm password are same
     function checkPasswordMatch(input1,input2){
         if ( input1.value !== input2.value ) {
             showError(input2,'password dont match')
             
         }

     }
    //function to check length of input field
  /*
    function checkLength(input,min,max){
        if (input.value.length < min) {
                showError(input,`${getFieldId(input)} needs to be at least ${min} characters`);

            
        }else if(input.value.length > max){
                showError(input,`${getFieldId(input)} needs to be less than ${max} characters`);

        } else{
            showSuccess(input);
        }

    }
    */
    //function to get the id of the input feild with proper case
    function getFieldId(input){
        return input.id.charAt(0).toUpperCase()+input.id.slice(1);

    }



//this an event listener for on submit
form.addEventListener('submit',function(e) {
    e.preventDefault();
    
    
    checkRequired([username,email,password,password2]);
     
    checkLength(username,3, 10);
    checkLength(password, 6, 30);
    checkEmail(email);
    checkPasswordMatch(password,password2);
     
        
    
});




    