window.addEventListener("load", () => {
    const docClass = document.body.getAttribute("data-document-class");
    console.log("Current page:", docClass);
    
    if(docClass === "contact-page"){
      console.log("contact.ejs page script running...");
  
      const formContact = document.querySelector("#contact-form");
      const firstNameTxt = formContact.querySelector("[name='firstName']");
      const lastNameTxt = formContact.querySelector("[name='lastName']");
      const emailTxt = formContact.querySelector("[name='email']");
      const commentsTxt =formContact.querySelector("[name='comments']");
  
      const aFirstName = formContact.querySelector("#aFirstName");
      const aLastName = formContact.querySelector("#aLastName");
      const anEmail = formContact.querySelector("#anEmail");
      const aComments = formContact.querySelector("#aComments");
  
      const fnDefault = aFirstName.innerHTML;
      const lnDefault = aLastName.innerHTML;
      const aeDefault = anEmail.innerHTML;
      const acDefault = aComments.innerHTML;
  
      function validateEmailAddress(email){
        const regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regExp.test(email);
      }
  
      function resetAlertMessage(){
        aFirstName.innerHTML = fnDefault;
        aLastName.innerHTML = lnDefault;
        anEmail.innerHTML = aeDefault;
        aComments.innerHTML = acDefault;
  
        aFirstName.classList.add("d-none");
        aLastName.classList.add("d-none");
        anEmail.classList.add("d-none");
        aComments.classList.add("d-none");
      }
  
      const validate = () => {
        let isValid = true;
        let focusOn = null;
  
        resetAlertMessage();
  
        if(!firstNameTxt.value){
          isValid = false;
          focusOn = firstNameTxt;
          aFirstName.classList.remove("d-none");
        }else if(firstNameTxt.value.length > 30){
          isValid = false;
          focusOn = firstNameTxt;
          aFirstName.innerHTML += "First name cannot exceed 30 characters."
          aFirstName.classList.remove("d-none");
        }
  
        if(!lastNameTxt.value){
          isValid = false;
          focusOn = focusOn || lastNameTxt;
          aLastName.classList.remove("d-none");
        }else if(lastNameTxt.value.length > 30){
          isValid = false;
          focusOn = focusOn || lastNameTxt;
          aLastName.innerHTML += "Last name cannot exceed 30 characters."
          aLastName.classList.remove("d-none");
        }
  
        if(!emailTxt.value){
          isValid = false;
          focusOn = focusOn || emailTxt;
          anEmail.classList.remove("d-none");
        }else if(emailTxt.value.length > 100){
          isValid = false;
          focusOn = focusOn || emailTxt;
          anEmail.innerHTML += "Email address cannot exceed 100 characters." 
          anEmail.classList.remove("d-none");
        }else if(!validateEmailAddress(emailTxt.value)){
          isValid = false;
          focusOn = focusOn || emailTxt;
          anEmail.classList.remove("d-none");
        }
  
        if(!commentsTxt.value){
          isValid = false;
          focusOn = focusOn || commentsTxt;
          aComments.classList.remove("d-none");
        }
  
        if(focusOn){
          focusOn.focus();
        }
  
        return isValid;
      }; 
  
      formContact.addEventListener("submit", (evt) => {
        if(validate()){
          confetti({
            particleCount: 100, 
            spread: 100,
          });
        }else{
          evt.preventDefault();
        }
      });
    }
  
});