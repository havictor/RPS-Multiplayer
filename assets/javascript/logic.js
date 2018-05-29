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
var playerSelection
var enemySelection

$("#seat").on("click", function() {
  event.preventDefault();
  checkOpen();
});

var gameSelection = database.ref("/game");

gameSelection.child("player1").on("child_added", function(childsnapshot) {
  if (player == "Player 2") {
    enemySelection = childsnapshot.val().player1choice; //localvariable enemySelection not changing upon child changed on server.
    game();
  }
})

gameSelection.child("player2").on("child_added", function(childsnapshot) {
  console.log("catch");
  if (player == "Player 1") {
    enemySelection = childsnapshot.val().player2choice; //localvariable enemySelection not changing upon child changed on server.
    game();
  }
})

//to do: need to add child_remove to reset game if other player disconnects midgame

//to do: add function to standup on click to give up seat and trigger reset()


function game() {
  if ((playerSelection != null) && (enemySelection != null)) {
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
      reset();
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
      reset();
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
      reset();
    }
    
  }
  
}

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
    database.ref("game").onDisconnect().remove()//
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
      database.ref("game").onDisconnect().remove()//
    }
    else if ((player == "Player 1") || (player == "Player 2")) {
      alert("You already have a seat, stop trying to hog all the chairs!");
    }
    else alert("There are no free spots at the table");
  });
}

function reset() {
  playerSelection = null;
  enemySelection = null;
  database.ref("game").remove();
}

//to do: make the colon a variable/if statement to prevent it from showing upon connect/disconnect messages
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
  if ((player != "Player 1") && (player != "Player 2")) {
    alert("You are not seated; please sit down to throw down");
  }
  if ((playerSelection == "") || (playerSelection == undefined)) {
    playerSelection=$(this).attr("id");
    if (player == "Player 1") {
      database.ref("game\/player1").set({
        player1choice: playerSelection
      })
    }
    else if (player == "Player 2") {
      database.ref("game\/player2").set({
         player2choice: playerSelection
      })
    }
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