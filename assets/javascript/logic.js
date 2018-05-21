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

var userSelection
var enemySelection

$("#DMZ").on("click", $(".choice"), function() {
  var userSelection=$(this.attr("choice"));
  //push choice to server
  //compare yours & enemy's choice via if statements (player 1 vs player 2?)
  //declare winner in chat
});

$(document).ready(
var textarea = document.getElementById("griefing");
textarea.scrollTop = textarea.scrollHeight);
