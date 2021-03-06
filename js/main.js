console.log("Bugs On A Rug");

var rugBoard = [];
var colorDisplayValue = "";
var count = 1;
var player1Turn = true;
var boardSize = 16;
var stinkBugsMaster = "ÖÖÖÖÖ";
var coopMode = false;
var p1Score = 0;
var p2Score = 0;
var gameHasStarted = false;

///////////////////////////////////////////////////////////////////////////
//Restart Game Button function
var restart = document.getElementById("restartButton");
restart.addEventListener('click', restartGame);
function restartGame(){
   window.location.reload();
}

///////////////////////////////////////////////////////////////////////////
//"How to Play" Button
var howToBtn = document.getElementById('howToButton')
howToBtn.addEventListener('click', howToPlay);
var howToMsg = document.getElementById('howToMessage');
function howToPlay(){	
	howToMsg.style.display = "block";
}

var howToOKBtn = document.getElementById('howToOKBtn');
howToOKBtn.addEventListener('click', howToOKBtnClick);
function howToOKBtnClick (){
	howToMsg.style.display = "none";
} 

///////////////////////////////////////////////////////////////////////////
//Game Start Button functions
var startBtn = document.getElementById("startButton");
startBtn.addEventListener('click', chooseStartGame);

var startMessage = document.getElementById("startMessage");
function chooseStartGame () {
	startMessage.style.display = "block";
}

var vsBtn = document.getElementById("vsBtn");
vsBtn.addEventListener('click', startVS);
function startVS () {
	startMessage.style.display = "none";
	gameHasStarted = true;
	var colorDisplay = document.getElementById("colorDisplay");
	colorDisplay.addEventListener('click', randomColorSelect);
	colorDisplay.style.cursor = "pointer";
	startGame();
}

var coopBtn = document.getElementById("coopBtn");
var containerRight = document.getElementById("containerRight");
coopBtn.addEventListener('click', startCoop);
function startCoop () {
	startMessage.style.display = "none";
	containerRight.style.visibility = "hidden";
	coopMode = true;
	gameHasStarted = true;
	var colorDisplay = document.getElementById("colorDisplay");
	colorDisplay.addEventListener('click', randomColorSelect);
	colorDisplay.style.cursor = "pointer";
	startGame();
}

///////////////////////////////////////////////////////////////////////////
//Game Start function
function startGame(){
	var redCount = 1;
	var blueCount = 1;
	var yellowCount = 1;
	var purpleCount = 1;
	for (var i = 0; i < boardSize; i++ ) { 
		rugBoard[i] = document.getElementById('bug' + count++); 
		rugBoard[i].addEventListener('click', clickCell);
      switch (i){
        case 0:
        case 5:
        case 10:
        case 15:
          rugBoard[i].data = "red";
          // rugBoard[i].style.backgroundColor = "red";
          rugBoard[i].style.cursor = "pointer";
          rugBoard[i].style.backgroundImage = "url(./images/redbug0"+(redCount++)+".png)";
          break;
       case 1:
       case 6:
       case 11:
       case 12:
          rugBoard[i].data = "blue";
          // rugBoard[i].style.backgroundColor = "blue";
          rugBoard[i].style.cursor = "pointer";
          rugBoard[i].style.backgroundImage = "url(./images/bluebug0"+(blueCount++)+".png)";
          break;
       case 2:
       case 7:
       case 8:
       case 13:
          rugBoard[i].data = "yellow";
          // rugBoard[i].style.backgroundColor = "yellow";
          rugBoard[i].style.cursor = "pointer";
          rugBoard[i].style.backgroundImage = "url(./images/yellowbug0"+(yellowCount++)+".png)";          
          break;
        default:
          rugBoard[i].data = "purple";
          // rugBoard[i].style.backgroundColor = "purple";
          rugBoard[i].style.cursor = "pointer";
          rugBoard[i].style.backgroundImage = "url(./images/purplebug0"+(purpleCount++)+".png)";      }
  }
	playerTurnDisplay.innerHTML = "Player 1";
	playerTurnDisplay.style.backgroundColor = "#90EE90";
	colorDisplayValue = "";
	colorDisplay.innerHTML = "Click for Color";
	colorDisplay.style.cursor = "pointer";
	startBtn.className += " disableButton";
	startBtn.style.cursor = "default";
}

///////////////////////////////////////////////////////////////////////////
//"Random Color Selector" Button
var randomColorSelect = function() {
    var num = Math.random();
    if (num < 0.25) {
        colorDisplayValue = "red";
        colorDisplay.innerHTML = "Red";
        colorDisplay.className = 'topMenu red';
        colorDisplay.className += " disableButton";
        colorDisplay.style.cursor = "default";	
        areAllHidden();
        return;
    } else if ((num > 0.25) && (num < 0.5)){
        colorDisplayValue = "blue";
        colorDisplay.innerHTML = "Blue";
        colorDisplay.className = 'topMenu blue';
        colorDisplay.className += " disableButton";
        colorDisplay.style.cursor = "default";	
        areAllHidden();
         return;
    } else if (num > 0.75) {
        colorDisplayValue = "yellow";
        colorDisplay.innerHTML = "Yellow";
        colorDisplay.className = 'topMenu yellow';
        colorDisplay.className += " disableButton";
        colorDisplay.style.cursor = "default";	
        areAllHidden();
        return;
    } else {
        colorDisplayValue = "purple";
        colorDisplay.innerHTML = "Purple";
        colorDisplay.className = 'topMenu purple';
        colorDisplay.className += " disableButton";
        colorDisplay.style.cursor = "default";	
        areAllHidden();
        return;
        }	
}

///////////////////////////////////////////////////////////////////////////
//Matching Bugs & Score Keeping function
var clickCell = function(event) {
	console.log("coopMode: " + coopMode);
	if (coopMode === false) {
			if (player1Turn) {
				if (this.data === colorDisplayValue) {
					p1Score += 1;
					p1ScoreBox.innerHTML = p1Score;
					this.className += " animated rotateOutUpLeft";
					var thisBug = this;
					setTimeout(function() {thisBug.style.visibility = "hidden";}, 800);
					player1Turn = false;
					playerTurnDisplay.innerHTML = "Player 2";
					playerTurnDisplay.style.backgroundColor = "#FF8C00";
					resetTopMenu();
				} 
			} else {
				if (this.data === colorDisplayValue) {
					p2Score += 1;
					p2ScoreBox.innerHTML = p2Score;
					this.className += " animated rotateOutUpRight";
					var thisBug = this;
					setTimeout(function() {thisBug.style.visibility = "hidden";}, 800);
					player1Turn = true;
					playerTurnDisplay.innerHTML = "Player 1";
					playerTurnDisplay.style.backgroundColor = "#90EE90";
					resetTopMenu();
				} 
			} endGame();
	} else {
		if (player1Turn) {
			if (this.data === colorDisplayValue) {
			var thisBug = this;
				p1Score += 1;
				p1ScoreBox.innerHTML = p1Score;
				this.className += " animated rotateOut";
				var thisBug = this;
				setTimeout(function() {thisBug.style.visibility = "hidden";}, 800);
				resetTopMenu();
			}
		} endGame();
	}
}

var p1ScoreBox = document.getElementById('p1ScoreBox');
var p2ScoreBox = document.getElementById('p2ScoreBox');
var playerTurnDisplay = document.getElementById('playerTurnDisplay');

function resetTopMenu(){
	colorDisplayValue = "";
	colorDisplay.innerHTML = "Click for Color";
	colorDisplay.className = colorDisplay.className.substring(0, colorDisplay.className.indexOf(' '));
	colorDisplay.style.cursor = "pointer";
}

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
		timer = window.setTimeout(addStinkBug, 1250);
	} 
	endGame();
}

var timer;
///////////////////////////////////////////////////////////////////////////
//Add Stink Bug function
function addStinkBug(event){
	if (coopMode === false) {	
		if (player1Turn) {
			if (p1StinkScore < 3) {	
				noMatch();			
			}
		} else {
			if (p2StinkScore < 3) {
				noMatch();
			}
		}
	} else if (player1Turn) {
		if (p1StinkScore < 5) {
			noMatch();
		}
	}
}

var stinkBugs = document.getElementById('stink');
//var stinkScore1 = document.getElementById('stinkScore1');
//var stinkScore2 = document.getElementById('stinkScore2');
var stinkCountDisplay = document.getElementById('stinkCountDisplay');
var p1BugBox = document.getElementById('p1BugBox');
var p2BugBox = document.getElementById('p2BugBox');
var stinkCounter = 5;
var p1StinkScore = 0;
var p2StinkScore = 0;

///////////////////////////////////////////////////////////////////////////
//No Match Alert and Add Stink Bug function
var noMatchMessage = document.getElementById('noMatchMessage');
function noMatch(){	
	noMatchMessage.style.display = "block";
}

var noMatchOKBtn = document.getElementById('noMatchOKBtn');
noMatchOKBtn.addEventListener('click', noMatchOKBtnClick);

function noMatchOKBtnClick (){
	if (coopMode === false) {
		if (player1Turn) {
			p1BugBox.innerHTML += "Ö";
			p1StinkScore += 1;
			player1Turn = false;
			playerTurnDisplay.innerHTML = "Player 2";
			playerTurnDisplay.style.backgroundColor = "#FF8C00";
			resetMenuStink();
			if (p1StinkScore === 3) {
				endGame();
			}
		} else {
			p2BugBox.innerHTML += "Ö";
			p2StinkScore += 1;
			player1Turn = true;
			playerTurnDisplay.innerHTML = "Player 1";
			playerTurnDisplay.style.backgroundColor = "#90EE90";
			resetMenuStink();
			if (p2StinkScore === 3) {
				endGame();
			}
		}	
	} else {
		if (player1Turn) {
			p1BugBox.innerHTML += "Ö";
			p1StinkScore += 1;
			resetMenuStink();
			if (p1StinkScore === 5) {
				endGame();
			}
		}
	} 
		for (var i = 5; i > stinkCounter ; i--){
			if (stinkCounter != 0) {
				stinkCountDisplay.innerHTML = Array(i).join("Ö");
			} else {
				stinkCountDisplay.innerHTML = "All Gone!";
			}
	} noMatchMessage.style.display = "none"; 
}

function resetMenuStink(){
	stinkCountDisplay.innerHTML = stinkBugsMaster;
	stinkCounter -= 1;
	colorDisplayValue = "";
	colorDisplay.innerHTML = "Click for Color";
	colorDisplay.className = colorDisplay.className.substring(0, colorDisplay.className.indexOf(' '));
}

///////////////////////////////////////////////////////////////////////////
//End Game function
function endGame(){
	if (coopMode === false) {	
		if (p1StinkScore === 3) {
			p1ThreeStinkBugs();
		} else if (p2StinkScore === 3) {
			p2ThreeStinkBugs();
		} else if ((p1Score + p2Score) === boardSize) {
			clearAllMessage();
		} 
	} else {
		if (p1StinkScore === 5) {
			coopFiveStinkBugs();
		} else if (p1Score === boardSize) {
			clearAllMessage();
		}
	}
}

///////////////////////////////////////////////////////////////////////////
//Maximum Stink Bugs Allowed Alert function
//Player 1 Loses
var p1StinkMessage = document.getElementById('p1StinkMessage');
function p1ThreeStinkBugs(){	
	p1StinkMessage.style.display = "block";
}

var p1StinkOKBtn = document.getElementById('p1StinkOKBtn');
p1StinkOKBtn.addEventListener('click', p1StinkOKBtnClick);
function p1StinkOKBtnClick (){
	p1StinkMessage.style.display = "none";
	restartGame();
} 

//Player 2 Loses
var p2StinkMessage = document.getElementById('p2StinkMessage');
function p2ThreeStinkBugs(){	
	p2StinkMessage.style.display = "block";
}

var p2StinkOKBtn = document.getElementById('p2StinkOKBtn');
p2StinkOKBtn.addEventListener('click', p2StinkOKBtnClick);
function p2StinkOKBtnClick (){
	p2StinkMessage.style.display = "none";
	restartGame();
} 

//Co-op Loses
var coopStinkMessage = document.getElementById('coopStinkMessage');
function coopFiveStinkBugs(){
	coopStinkMessage.style.display = "block";
}

var coopStinkOKBtn = document.getElementById('coopStinkOKBtn');
coopStinkOKBtn.addEventListener('click', coopStinkOKBtnClick);
function coopStinkOKBtnClick (){
	coopStinkMessage.style.display = "none";
	restartGame();
}

///////////////////////////////////////////////////////////////////////////
//Board All Clear Alert function
var allClearMessage = document.getElementById('allClearMessage');
function clearAllMessage(){	
	allClearMessage.style.display = "block";
}

var allClearOKBtn = document.getElementById('allClearOKBtn');
allClearOKBtn.addEventListener('click', allClearOKBtnClick);
function allClearOKBtnClick (){
	allClearMessage.style.display = "none";
	restartGame();
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

