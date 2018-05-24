  var config = {
    apiKey: "AIzaSyBUb0nTz38498BfIgXvzS_cikLWfqEQoAk",
    authDomain: "rps-multiplayer-9dac6.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-9dac6.firebaseio.com",
    projectId: "rps-multiplayer-9dac6",
    storageBucket: "",
    messagingSenderId: "435987726360"
  };
  firebase.initializeApp(config);

let database=firebase.database();

let username=$.trim(prompt("What is your name?"));

if (username === "") {
  $("#greeting").text("Welcome, agent of the House of Black and White");
}
else $("#greeting").text("Welcome, "+username+"!");

//create function to check ifplayer 1 or player 2 is free
function checkOpen() {
  database.ref().once("value") .then(function(snapshot) {
  if (!snapshot.val("Player1").exists()) {
    //set player to player1
  }
  else if (!snapshot.val("Player2").exists()) {
    //set player to player2
  }
});

database.ref().on("child_added", function(childsnapshot) {
  var previousText = $("#griefing").text();
  $("#griefing").text(`${previousText} \n ${childsnapshot.val().username}: ${childsnapshot.val().message}`);
});

$("#grief").on("click", function(event) {
  event.preventDefault();
  var message = $("#BM").val().trim();
  if (message != "") {
    database.ref().push({
      username: username,
      message: message
    })
    $("#BM").val("");
  }
});

//announce changes in player taking a seat? database.ref().on("value")

var userSelection
var enemySelection

$(".choice").on("click", function() {
  if (userSelection === "") {
    userSelection=$(this).attr("id");

  
  //push choice to server
  //compare yours & enemy's choice via if statements (player 1 vs player 2?)
  //declare winner in chat
  
  
  //need a promise where wait for enemySelecction, andthen reset
  userSelection="";
});

$(document).ready();
var textarea = document.getElementById("griefing");
textarea.scrollTop = textarea.scrollHeight;
