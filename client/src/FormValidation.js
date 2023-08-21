
//userName validation

export function validateUserName(value) {
    
    if (value.length <= 5) {
        alert("Username must be at least 7 characters long.");
        return false;
      } else {
        
           return true;
      }
  }


export function validateEmail(value){
    let emailExpression= new RegExp(/.\@[^\s]+\.com$/);// regular expression format for email

    if(emailExpression.test(value)){
        return true;
    }
    else{
        alert("Please enter a valid email");
    }
}

export function validatePassword(value){
    let charExpression = new RegExp()
    if(charExpression.test(value)){
        alert("Enter a Password with at a number or special character.");
        return false;
    }
    else if(value.lenth < 8){
        alert("Password must have at least 8 characters.");
        return false;
    }
    else{
        return true;
    }
}



// if (!validateUserName(userName)) {
//     console.log("InputValidationFailed")
//     return false;
//   }

//   if(!validateEmail(email)){
//     console.log("InputValidationFailed")
//     return false;
//   }



// export

//validate form

// export function ValidateForm(){


//     if(!validateUserName(formData)){
//         alert("Test");
//         return false;
//     }
//     return true;

// }//end function