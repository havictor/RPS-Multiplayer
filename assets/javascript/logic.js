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
//let database1=firebase.database().ref("player1");//
//let database2=firebase.database().ref("player2");//

let username=$.trim(prompt("What is your name?"));

if (username === "") {
  $("#greeting").text("Welcome, agent of the House of Black and White");
}
else $("#greeting").text("Welcome, "+username+"!");

var player
var playerCount

$("#seat").on("click", function() {
  checkOpen();
});

// var connect = database.ref("user");
//   if (player = "Player 1") {
//     connect.update({
//       player1name: "",

//     })
//   }
//   connect.update({
//     playerCount
//   })
//   playerCount: playerCount--
  
// })
// //

function checkOpen() {
  var connect = database.ref("user");
  var chatConnect = database.ref("chat");
    connect.once("value").then(function(snapshot) {
      playerCount = snapshot.val().playerCount;
      if ((snapshot.val().playerCount == 0) && (player !== "Player 1") && (player !== "Player 2")) {
        player = "Player 1"
        playerCount++
        database.ref("user").update({
          playerCount: playerCount,
          player1name: username
        });
        database.ref("chat").push({
          username: player+" "+username,
          message: " has entered the game"
        })
    //should reset ondisconnect
    connect.onDisconnect().update({
      playerCount: (playerCount-1),
      player1name: ""
    })
    //var disconnectMessage = ref("chat").push()
    chatConnect.onDisconnect().set({
      username: player+" "+username,
      message: " has left the game"
    })
      }
      else if ((snapshot.val().playerCount == 1) && (player !== "Player 1") && (player !== "Player 2")) {
        player ="Player 2"
        playerCount++
        database.ref("user").update({
          playerCount: playerCount,
          player2name: username
        });
        database.ref("chat").push({
          username: player+" "+username,
          message: " has entered the game"
        })
        connect.onDisconnect().update({
          playerCount: (playerCount-1),
          player2name: ""
        })
      }
      else if ((player == "Player 1") || (player == "Player 2")) {
        alert("You already have a seat, stop trying to hog all the chairs!");
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


var userSelection
var enemySelection

database.ref("game").on("value", function(snap) {
  //change enemySelection
})

$(".choice").on("click", function() {
  if (userSelection === "") {
    userSelection=$(this).attr("id");
    if (player == "Player 1") {
      database.ref("game").update({
        player1choice: userSelection
      })
      
    }
    else if (player == "Player 2") {
      database.ref("game").update({
        player2choice: userSelection
      })

    }
  //push choice to server
  //compare yours & enemy's choice via if statements (player 1 vs player 2?)
  //declare winner in chat
  
  
  //need a promise where wait for enemySelecction, andthen reset
  userSelection="";
  }
});

database.ref("user").on("value", function(snaps) {
  playerCount=snaps.val().playerCount;
})

//need to fix autoscroll.
$(document).ready();
var textarea = document.getElementById("griefing");
textarea.scrollTop = textarea.scrollHeight;
