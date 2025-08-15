function checkIfChatIsOpen(){
  if (document.getElementById("mychat").style.display !== 'block'){
    openChat()
  }
  else {
    closeChat()
  }
}

function openChat() {
  document.getElementById("mychat").style.display = "block";
  console.log("Chat Opened")
  document.getElementById("iconbtn").style.display = "none";
}

function closeChat() {
  document.getElementById("mychat").style.display = "none";
  console.log("Chat Closed.")
  document.getElementById("iconbtn").style.display = "block";
}

function submitTrackingId(){
  document.getElementById('singleLineInput').readOnly = true;
  const userInput = document.getElementById('singleLineInput').value;
  console.log(userInput)
  if (userInput != ''){
    checkIfValidId(userInput);
  }
  
}

const noLettersRegex = /^[^a-zA-Z]*$/;
console.log(noLettersRegex.test("")); // true

function checkIfValidId(input) {
  if (noLettersRegex.test(input) == true && input.length == 12){
    console.log("only numbers here it works.")
  }
  else{
    console.log("invalid input")
  }
}