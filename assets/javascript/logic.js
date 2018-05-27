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
let database1=firebase.database().ref("player1");//
let database2=firebase.database().ref("player2");//

let username=$.trim(prompt("What is your name?"));

if (username === "") {
  $("#greeting").text("Welcome, agent of the House of Black and White");
}
else $("#greeting").text("Welcome, "+username+"!");

var player

$("#seat").on("click", function() {
  checkOpen();
});

// //
// database1.onDisconnect().update({
//   database.ref("user").update({
//     player1: false,
//     player1name: ""
//   })
//   database.ref("chat").push({
//     username: player+" "+username,
//     message: "has left the game"
//   })
// })


// database2.onDisconnect().update({
//     database.ref("user").update({
//       player2: false,
//       player2name: ""
//     })
//     database.ref("chat").push({
//       username: player+" "+username,
//       message: "has left the game"
//     })
// })

function checkOpen() {
  database.ref("user").once("value").then(function(snapshot) {
  if (snapshot.val().player1 != true) {
    player = "Player 1"
    database.ref("user").push({
      player1: true,
      player1name: username
    });
    var previousText = $("#griefing").text();
    $("#griefing").text(`${previousText} \n ${player} ${username} has entered the game`);
    //set player to player1
  }
  else if (snapshot.val().player2 != true) {
    player ="Player 2"
    database.push({
      player2: true,
      player2name: username
    });
    var previousText = $("#griefing").text();
    $("#griefing").text(`${previousText} \n ${player} ${username} has entered the game`);
    //set player to player2
  }
  else alert("There are no free spots at the table");
  });
}

database.ref("chat").on("child_added", function(childsnapshot) {
  var previousText = $("#griefing").text();
  $("#griefing").text(`${previousText} \n ${childsnapshot.val().username}: ${childsnapshot.val().message}`);
});

$("#grief").on("click", function(event) {
  event.preventDefault();
  var message = $("#BM").val().trim();
  if (message != "") {
    database.ref("chat").push({
      username: username,
      message: message
    })
    $("#BM").val("");
  }
});

database.onDisconnect

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
  }
});

$(document).ready();
var textarea = document.getElementById("griefing");
textarea.scrollTop = textarea.scrollHeight;
