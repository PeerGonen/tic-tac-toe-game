/*The Document method querySelectorAll() returns a static (not live) NodeList representing a list of the document's elements that match the specified group of selectors */
    const tiles = Array.from(document.querySelectorAll('.tile'));

   /* The Document method querySelector() returns the first Element within the document that matches the specified selector, or group of selectors */
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

/* we'll decide wether the user wants to perform a valid action or not.
 If the inner text of the tile is X or O we return false as the action is invalid,
 otherwise the tile is empty so the action is valid. */
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        } else { return true; }
    };

/*we'll receive an index as a parameter and set the corresponding element in the board array to be the sign of our current player. */
    const updateBoard =  (playerTorn) => {
        board[playerTorn] = currentPlayer;
    }

    /* we'll first remove the current player's class from the playerDisplay.
     The string template literal player${currentPlayer} will become either playerX or playerO depending on the current player */

     const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    /*we'll create a roundWon variable and initialise it with false. 
    Then we'll loop through the winConditions array and check the board for each winning condition. */
    function gameMode() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }
    if (!board.includes(''))
        announce(TIE);
    }

    /* the annouce will receive an end game type and update the innerText of the announcer DOM node based on the result. */
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };
   
  /*userAction will receive a tile and an index as a parameter. (This function will be called when the user clicks a tile)
 1. we need to check if it is a valid action or not and  also to check if the game is active or not. If both of them are true,
we update the innerText of the tile with the sign of the current player, add the corresponding class and update the board array.
  Now we have to check whether the game hase ended or not so we call  gameMode().
Lastly we have to call the changePlayer method to pass the turn to the other player. */
    const userAction = (tile, playerTorn) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(playerTorn);
            gameMode();
            changePlayer();
        }
    }
    
     /*we have to add event listeners to the tiles.
     We can do that by looping through the array of tiles and add an event listener for each.*/
     tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    /*In this function we set the board to consist of nine empty strings, set the game to active,
     remove the announcer and change the player back to X (by definition X starts always).*/
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

   
  
