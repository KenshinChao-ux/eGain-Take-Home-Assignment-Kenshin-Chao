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

