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

var player
var player1seat
var player2seat
var userSelection
var enemySelection

$("#seat").on("click", function() {
  event.preventDefault();
  checkOpen();
});

var gameSelection = database.ref("/game");
gameSelection.on("child_changed", function(childsnapshot) {
  console.log("catch");
  if (player == "Player 1") {
    console.log("player2")
    //console.log(children.child("player2").val().player2choice)
    console.log(database.ref("\/game\/player2").val().player2choice)
    //enemySelection = children.child("player2").val().player2choice
  }
  else if (player == "Player 2") {
    console.log("player1")
    //console.log(children.child("player1").val().player1choice)
    console.log(database.ref("\/game\/player1").val().player1choice)
    //enemySelection = children.child("player1").val().player1choice
  }
  if (playerSelection == "scissors") {
    if (enemySelection == "rock") {
      database.ref("chat").push({
        username: player+" "+username,
        message: `has lost using ${playerSelection}`
      })
    }
    else if (enemySelection == "paper") {
      database.ref("chat").push({
        username: player+" "+username,
        message: `has won using ${playerSelection}`
      })
    }
    else if (enemySelection == "scissors") {
      database.ref("chat").push({
        username: player+" "+username,
        message: `has drew using ${playerSelection}`
      })
    }
  }
  else if (playerSelection == "rock") {
    if (enemySelection == "rock") {
      database.ref("chat").push({
        username: player+" "+username,
        message: `has drew using ${playerSelection}`
      })
    }
    else if (enemySelection == "paper") {
      database.ref("chat").push({
        username: player+" "+username,
        message: `has lost using ${playerSelection}`
      })
    }
    else if (enemySelection == "scissors") {
      database.ref("chat").push({
        username: player+" "+username,
        message: `has won using ${playerSelection}`
      })
    }
  }
  else if (playerSection == "paper") {
    if (enemySelection == "rock") {
      database.ref("chat").push({
        username: player+" "+username,
        message: `has won using ${playerSelection}`
      })
    }
    else if (enemySelection == "paper") {
      database.ref("chat").push({
        username: player+" "+username,
        message: `has drew using ${playerSelection}`
      })
    }
    else if (enemySelection == "scissors") {
      database.ref("chat").push({
        username: player+" "+username,
        message: `has lost using ${playerSelection}`
      })
    }
  }
})

function checkOpen() {
var connect1 = database.ref("user");
var connect2 = database.ref("user");
  connect1.once("value").then(function(snapshot) {
    player1seat = snapshot.val().player1seat;
    player2seat = snapshot.val().player2seat;
    if ((player1seat != false) && (player !== "Player 1") && (player !== "Player 2")) {
      player = "Player 1"
      player1seat = false;
      database.ref("user").update({
        player1seat: player1seat,
        player1name: username
      });
      database.ref("chat").push({
        username: player+" "+username,
        message: " has entered the game"
      })
    connect1.onDisconnect().update({
      player1seat: true,
      player1name: ""
    })
    var chatConnect1 = database.ref("chat").push();
    chatConnect1.onDisconnect().set({
      username: player+" "+username,
      message: " has left the game"
    })
    }
    else if ((player2seat != false) && (player !== "Player 1") && (player !== "Player 2")) {
      player ="Player 2"
      player2seat = false;
      database.ref("user").update({
        player2seat: player2seat,
        player2name: username
      });
      database.ref("chat").push({
        username: player+" "+username,
        message: " has entered the game"
      })
      connect2.onDisconnect().update({
        player2seat: true,
        player2name: ""
      })
      var chatConnect2 = database.ref("chat").push();
      chatConnect2.onDisconnect().set({
        username: player+" "+username,
        message: " has left the game"
      })
    }
    else if ((player == "Player 1") || (player == "Player 2")) {
      alert("You already have a seat, stop trying to hog all the chairs!");
    }
    else alert("There are no free spots at the table");
  });
}

//make the colon a variable to prevent it from showing upon connect/disconnect
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

$(".choice").on("click", function() {
  if ((userSelection == "") || (userSelection == undefined)) {
    userSelection=$(this).attr("id");
    if (player == "Player 1") {
      database.ref("game\/player1").set({
        player1choice: userSelection
      })
    }
    else if (player == "Player 2") {
      database.ref("game\/player2").set({
        player2choice: userSelection
      })
    }
//push choice to server
//compare yours & enemy's choice via if statements (player 1 vs player 2?)
//declare winner in chat


//need a promise where wait for enemySelecction, andthen reset
//userSelection="";
  }
});

database.ref("user").on("value", function(snaps) {
  player1seat=snaps.val().player1seat;
  player2seat=snaps.val().player2seat;
})

//need to fix autoscroll.
$(document).ready();
var textarea = document.getElementById("griefing");
textarea.scrollTop = textarea.scrollHeight;