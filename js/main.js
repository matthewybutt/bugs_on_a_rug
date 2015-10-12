/*
1. When the page loads-
	A. display game title, board, random color generator, both players' bug containers, information button and start button

2. Information button:
	A. at any point during game play the "information" button can be clicked to display the rules of the game

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

