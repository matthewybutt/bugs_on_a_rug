console.log("Bugs On A Rug");

var rugBoard = [];
var colorDisplayValue = ""
var count = 1;
var player1Turn = true;
var boardSize = 16
var stinkBugs = 5

///////////////////////////////////////////////////////////////////////////
//Game Start function
var gameStart = document.getElementById("start")

gameStart.addEventListener('click', startGame);

function startGame(){
	for (var i = 0; i < boardSize; i++ ) { 
		rugBoard[i] = document.getElementById('bug' + count++); 
		rugBoard[i].addEventListener('click', clickCell);
		if ((i === 0) || (i === 5) || (i === 10) || (i === 15)) {
			rugBoard[i].data = "red";
			rugBoard[i].style.backgroundColor = "red";
		} else if ((i === 1) || (i === 6) || (i === 11) || (i === 12)) {
			rugBoard[i].data = "blue";
			rugBoard[i].style.backgroundColor = "blue";
		} else if ((i === 2) || (i === 7) || (i === 8) || (i === 13)) {
			rugBoard[i].data = "yellow";
			rugBoard[i].style.backgroundColor = "yellow";
		} else {
			rugBoard[i].data = "purple";
			rugBoard[i].style.backgroundColor = "purple";
		}
	} playerTurn.innerHTML = "Player 1's turn"

}

///////////////////////////////////////////////////////////////////////////
//Restart Game button function
var restart = document.getElementById("restart")

restart.addEventListener('click', restartGame);

function restartGame(){
   window.location.reload();
   gameStart();
}

///////////////////////////////////////////////////////////////////////////
//"How to Play" Button
var howTo = document.getElementById("howTo")

howTo.addEventListener('click', howToPlay);

function howToPlay (){
	alert("Bugs On A Rug is a matching game where players try and clear the bugs off of the rug! On your turn click the color selector button and match the color of the bug given to you to clear it off the rug. If you can't make a match you get a stink bug, collect 3 stink bugs and you lose!");
}

///////////////////////////////////////////////////////////////////////////
//"Random Color Selector" Button
var rng = function() {
    var color = "";
    var num = Math.random();
    console.log(num);
    if (num > 0.75) {
        console.log("red");
        colorDisplayValue = "red";
        (colorDisplay.innerHTML = "Red", colorDisplay.style.backgroundColor = "red");
        areAllHidden();
        return;
    } else if (num < 0.25) {
        console.log("blue");
        colorDisplayValue = "blue";
        (colorDisplay.innerHTML = "Blue", colorDisplay.style.backgroundColor = "blue");
         areAllHidden();
         return;
    } else if ((num > 0.25) && (num < 0.5)) {
        console.log("yellow");
        colorDisplayValue = "yellow";
        (colorDisplay.innerHTML = "Yellow", colorDisplay.style.backgroundColor = "yellow");
        areAllHidden();
        return;
    } else {
        console.log("purple");
        colorDisplayValue = "purple";
        (colorDisplay.innerHTML = "Purple", colorDisplay.style.backgroundColor = "purple");
        areAllHidden();
        return;
        }
}

var colorSelect = document.getElementById("rcs");
var colorDisplay = document.getElementById("colorDisplay");

var selectColor = colorSelect.addEventListener('click', rng);


///////////////////////////////////////////////////////////////////////////
//Matching Bugs & Score Keepeing function
var clickCell = function(event) {
	if (player1Turn) {
		if (this.data === colorDisplayValue) {
			console.log("match");
			p1ScoreBoard += 1;
			p1Score.innerHTML = p1ScoreBoard;
			this.style.visibility = "hidden";
			player1Turn = false;
			playerTurn.innerHTML = "Player 2's turn"
			colorDisplayValue = ""
			colorDisplay.innerHTML = "<- Click RCS"
			colorDisplay.style.backgroundColor = ""
		} else {
			console.log("no match");
	//		alert("Sorry, not a match!");
		}
	} else {
		if (this.data === colorDisplayValue) {
			console.log("match");
			p2ScoreBoard += 1;
			p2Score.innerHTML = p2ScoreBoard;
			this.style.visibility = "hidden";
			player1Turn = true;
			playerTurn.innerHTML = "Player 1's turn"
			colorDisplayValue = ""
			colorDisplay.innerHTML = "<- Click RCS"
			colorDisplay.style.backgroundColor = ""
		} else {
			console.log("no match");
	//		alert("Sorry, not a match!");
		}
	} endGame();
}

var p1ScoreBoard = 0;
var p2ScoreBoard = 0;
var p1Score = document.getElementById('score1');
var p2Score = document.getElementById('score2');
var playerTurn = document.getElementById('playerTurn')


///////////////////////////////////////////////////////////////////////////
//Checking for Available Moves function
function areAllHidden() {
	var hidden = 0;
	for (var i = 0; i < boardSize; i++) {
		if ((rugBoard[i].style.visibility === "hidden") &&
			(rugBoard[i].data === colorDisplayValue)){
			hidden += 1;
		}
	} if (hidden === 4) {
		alert("Uh-oh, there's no matching bugs for you!  You lose your turn and get a stink bug!");
		addStinkBug();
	} endGame();
}

///////////////////////////////////////////////////////////////////////////
//Stink Bugs function

function addStinkBug(event){
	if (player1Turn) {
		p1StinkScoreBoard += 1;
		stinkScore1.innerHTML = p1StinkScoreBoard;
		stinkCounter -= 1;
		stinkCount.innerHTML = stinkCounter;
		player1Turn = false;
		playerTurn.innerHTML = "Player 2's turn"
		colorDisplayValue = ""
		colorDisplay.innerHTML = "<- Click RCS"
		colorDisplay.style.backgroundColor = ""
		if (p1StinkScoreBoard === 3) {
//			alert("Uh-oh, Player 1 has 3 stink bugs!  Player 1 loses!");
		}
	} else {
		p2StinkScoreBoard += 1
		stinkScore2.innerHTML = p2StinkScoreBoard;
		stinkCounter -= 1;
		stinkCount.innerHTML = stinkCounter;
		player1Turn = true;
		playerTurn.innerHTML = "Player 1's turn"
		colorDisplayValue = ""
		colorDisplay.innerHTML = "<- Click RCS"
		colorDisplay.style.backgroundColor = ""
		if (p2StinkScoreBoard === 3) {
//			alert("Uh-oh, Player 2 has 3 stink bugs!  Player 2 loses!");
		}
	}
}

var stinkBugs = document.getElementById('stink');
var stinkScore1 = document.getElementById('stinkScore1');
var stinkScore2 = document.getElementById('stinkScore2');
var stinkCount = document.getElementById('stinkCount');
var stinkCounter = 5
var p1StinkScoreBoard = 0;
var p2StinkScoreBoard = 0;
//stinkBugs.addEventListener('click', addStinkBug)

///////////////////////////////////////////////////////////////////////////
//Stink Bugs function

function endGame(){
	if (p1StinkScoreBoard === 3) {
		alert("Uh-oh, Player 1 has 3 stink bugs!  Player 2 wins!  The game is over!  Thanks for playing Bugs On A Rug!  Click the 'Start' button to play again!");
		restartGame();
	} else if (p2StinkScoreBoard === 3) {
		alert("Uh-oh, Player 2 has 3 stink bugs!  Player 1 wins!  The game is over!  Thanks for playing Bugs On A Rug!  Click the 'Start' button to play again!");
		restartGame();
	} else if ((p1ScoreBoard + p2ScoreBoard) === boardSize) {
		alert("WOW!  You both cleared the board, good for you!  The game is over!  Thanks for playing Bugs On A Rug!  Click the 'Start' button to play again!");
		restartGame();
	}
}


/*
1. When the page loads-
	A. display game title, board, random color generator, both players' bug containers, "How to Play" button and start button

2. "How to Play" button:
	A. at any point during game play the "How to Play" button can be clicked to display the rules of the game

3. When the player clicks the start button:
	A. the game board populates with bug tokens
		i. 16 bugs total (4 red, 4 blue, 4 yellow, 4 purple)
		ii. board clicks are disabled
	B. inform player 1 it is his turn

4. On a player's turn:
	A. enable random color generator button
	B. player 1 clicks on the random color generator to set key color value for his turn
		i. disable the random color generator button and enable board clicks
		ii. check the board-
			a. if there is at least 1 bug that matches the key color value the player can click on the board to make a guess
			b. if there are no bugs that match the key color value then a penalty token (stink bug) is placed on that player's side of the board-
				~ if the total number of stink bugs is less than 3 then the turn switches to the next player
				~ if the total number of stink bugs equals 3 then the player loses-
					# inform players to click "start" to play a new game-
						## if "start" button is clicked go back to step 1.
	
5. When a player clicks on the board:
	A. if the click is on a bug that matches the key color value-
		i. the bug disappears from the board & populates on the player's side of the board
		ii. disable board clicks
		iii. the turn switches to next player 
		iiii. enable random color generator 
	B. if the click is on a bug that does not match the key color value-
		i. inform player that it is not a color match and to pick again
	C. if the click is on an empty space-
		i. do nothing

6. After the player has completed the turn:
	A. check the board to see if bugs left equals 0
		i. if there are more than 0 bugs left then play continues to the next player
		ii. if there are 0 bugs left on the board-
			a. count total number of bugs on player 1's side minus player 1's stink bugs
			b. count total number of bugs on player 2's side minus player 2's stink bugs
			c. compare player 1's total to player 2's total-
				~if player 1's total is greater than player 2 alert player 1 is winner
				~if player 2's total is greater than player 1 alert player 2 is winner
				~if player 1's total is equal to player 2 alert it was a tie
			d. inform players to click "start" to play a new game-
				~if "start" button is clicked go back to step 1.

*/

