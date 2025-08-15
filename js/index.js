var currentTimes = 0;
var chatarea = document.getElementById("chatarea") //global variable since used repeatedly

const originalContent = document.getElementById("chatarea").innerHTML; //for resetting the chat without having to refresh the page.

function checkIfChatIsOpen(){
  if (document.getElementById("mychat").style.display !== 'block'){  //checks if the chat display type none (invisible/not active)
    openChat()
  }
  else {
    closeChat()
  }
}

function generateRandomNumberBetween0and4(){ //generate random number for the decision of what happened to the package (shown in flowchart)
  min = Math.ceil(0);
  max = Math.floor(4);
  let result = Math.floor(Math.random() *max);

  return result;
}


function openChat() { //changes style display of the chat box to block(active)
  document.getElementById("mychat").style.display = "block";
  
  document.getElementById("iconbtn").style.display = "none";
}

function closeChat() {//changes style display of the chat box to block(invisible/inactive)
  document.getElementById("mychat").style.display = "none";
  
  document.getElementById("iconbtn").style.display = "block";
}

function submitTrackingId(){ //really roundabout way to keep track of a specific button with the duplicates.
//works by keeping the ids of the submit buttons and input fields separate so we can enable and disable the correct ones -
//when continuing on making duplicates for later conversation.
  let singleLineInputstr = `singleLineInput${currentTimes}`;
  document.getElementById(singleLineInputstr).readOnly = true;
  let submitstr = `submit${currentTimes}`; //results in submit0 (beginning) submit1 (first duplicate) etc..
  let submitButton = document.getElementById(submitstr)
  if (submitButton){
    submitButton.disabled = true
  }


  let userInput = document.getElementById(singleLineInputstr).value; //grabs the element id by singleLineInput0, singleLineInput1 etc.
  
  if (userInput != ''){
    if (checkIfValidId(userInput)){
      replyToValidId(userInput);
    }
    else {
      replyToInvalidId(false);
    }
  }
  else {
      replyToInvalidId(true);
    }
  
}

const noLettersRegex = /^[^a-zA-Z]*$/; //no letters at all is allowed in the string.

function checkIfValidId(input) {
  if (noLettersRegex.test(input) == true && input.length == 12){ //only numbers and is 12 digits long
    return true;
  }
  else{ //else is an invalid input
  
    return false;
  }
}

async function replyToValidId(Idgiven){
//makes a string and adds the snippet into the chat area as innerhtml. (appends messages to the chat)
  const string = `<div class ="msgcontainerbot"> 
                <img class ="botimg" src = "./imgs/boticon.png">
                <p>It looks like the tracking number: ${Idgiven} is valid! Please give me a moment.
            </div> `
    chatarea.innerHTML += string;
    chatarea.scrollTop = chatarea.scrollHeight;
    await delay(2000)
    let random = generateRandomNumberBetween0and4();
    if (random == 0){ //in transit
    let string = `<div class ="msgcontainerbot">
                <img class ="botimg" src = "./imgs/boticon.png">
                <p>The package is In Transit. Currently located in the mail center in [city].
            </div> `
        
    chatarea.innerHTML += string; //adds the string to the innerhtml of the chatbox.
    chatarea.scrollTop = chatarea.scrollHeight; //adds an automatic scroll for the users convenience. 
    }

    //decision is based as follows: 0 = in transit, 1 = packaged delayed, 2 = delivered, 
    // 3 = no data (unknown to bot such as haven't updated database yet or invalid for unknown reason)
    
    else if (random == 1){ //choose decision 1 which is "Package is delayed"
    let string = `<div class ="msgcontainerbot">
                <img class ="botimg" src = "./imgs/boticon.png">
                <p>The package is delayed by x days. Currently located in the mail center in [city].
            </div> `
    chatarea.innerHTML += string;
    chatarea.scrollTop = chatarea.scrollHeight;
    }
    else if (random == 2){ //delivered
    let string = `<div class ="msgcontainerbot">
                <img class ="botimg" src = "./imgs/boticon.png">
                <p>The package was delivered on 8/15/2025 at the mail address.
            </div> `
    chatarea.innerHTML += string;
    chatarea.scrollTop = chatarea.scrollHeight;
    } 
    else if (random == 3){ //no data
    let string = `<div class ="msgcontainerbot">
                <img class ="botimg" src = "./imgs/boticon.png">
                <p>Oh no! The package isn't in my database. We have to escalate this to a human.
                <br> You can wait for the next available agent or call XXX.
            </div> `
    chatarea.innerHTML += string;
    chatarea.scrollTop = chatarea.scrollHeight;
    }

    await delay(2000)
    let tryagainstring = `<div class ="msgcontainerbot">
                <img class ="botimg" src = "./imgs/boticon.png">
                <p>Would you like to try another tracking number?
            </div> 
            <div>
            <div class ="msgcontaineruser">
                <img class ="userimg" src = "./imgs/usericon.png">
                <button class="btnyes" onclick="askPrompt(true)" id = "yesbtn${currentTimes}">
                    YES
                </button>
                <button class="btnno" onclick="askPrompt(false)" id = "nobtn${currentTimes}">
                    NO
                </button>
            </div>
        </div>`
 chatarea.innerHTML += tryagainstring;
  chatarea.scrollTop = chatarea.scrollHeight;
    await delay(2000)


}


function askPrompt(choice){ //decides whether to reset the chat, replacing all content with the original. (before any conversation has begun)
  
  if (choice == true){
    let yesbtnstr = `yesbtn${currentTimes}`;
  let nobtnstr = `nobtn${currentTimes}`;
  if (document.getElementById(yesbtnstr) && document.getElementById(nobtnstr)){
    document.getElementById(yesbtnstr).disabled = true;
    document.getElementById(nobtnstr).disabled = true;
  }
  //const freshStartStr = originalContent;
  currentTimes+=1;

  let strrestarting = `<div class ="msgcontainerbot">
                <img class ="botimg" src = "./imgs/boticon.png">
                <p>"I’d be glad to help you track your package. Could you please share your 12-digit tracking number so I can look it up for you right away!"
                </p>
            </div>
            <div class ="msgcontaineruser">
                <img class ="userimg" src = "./imgs/usericon.png">
                <input type="text" maxlength ="12" id="singleLineInput${currentTimes}">
                <button class="btnsubmit" id ="submit${currentTimes}" onclick="submitTrackingId()">  
                    submit
                </button>     
            </div>`
            
  chatarea.innerHTML += strrestarting;
  chatarea.scrollTop = chatarea.scrollHeight;
  }
  else{
    //do nothing, let the user read the chat if they want.
  }
}

async function replyToInvalidId(emptybool){ //if empty then use different sentence. (emptybool)

  if (emptybool){
    const string = `<div class ="msgcontainerbot">
                <img class ="botimg" src = "./imgs/boticon.png">
                <p>Oops! It looks like you forgot to put a tracking number! Please try again.
            </div> `
    
    chatarea.innerHTML += string;
    await delay(2000);
    currentTimes+=1;
  const userstring = `<div class ="msgcontaineruser">
                <img class ="userimg" src = "./imgs/usericon.png">
                <input type="text" maxlength ="12" id= "singleLineInput${currentTimes}" name="singleLineText"></textarea>
                <button class="btnsubmit" id ="submit${currentTimes}" onclick="submitTrackingId()">
                    submit
                </button>     
            </div> 
        `
        
  chatarea.innerHTML += userstring;
  chatarea.scrollTop = chatarea.scrollHeight;
  } 
else{
  const string = `<div class ="msgcontainerbot">
                <img class ="botimg" src = "./imgs/boticon.png">
                <p>The tracking number seems to be invalid! Can you try again? The Id has to be 12 digits.
            </div> 
            `
  chatarea.innerHTML += string;
  chatarea.scrollTop = chatarea.scrollHeight;
  await delay(2000)
   currentTimes+=1;
  const userstring = `<div class ="msgcontaineruser">
                <img class ="userimg" src = "./imgs/usericon.png">
                <input type="text" maxlength ="12" id="singleLineInput${currentTimes}" name="singleLineText"></textarea>
                <button class="btnsubmit" id ="submit${currentTimes}" onclick="submitTrackingId()">
                    submit
                </button>     
            </div>`
  chatarea.innerHTML += userstring;
  chatarea.scrollTop = chatarea.scrollHeight;
}
}


function delay(timeInMilliseconds) { //delay by milliseconds. For making the chatbot feel more real and less instant.
  return new Promise(resolve => setTimeout(resolve, timeInMilliseconds));
}