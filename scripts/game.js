import Player from './player.js';
import Board from './board.js';

export default class Game {
    currentPlayer = null
    gameIsOn = true
    board = null
    player1 = null
    player2 = null
    players =  []
    won = false
    gamediv = null

    // public references
    resetBtn = null
    startBtn = null
    gameDiv = null
    playersDiv = null
    playerOneMessageSpan = null
    playerTwoMessageSpan = null
    messageDiv = null

    // Messages 
    static get MAKE_YOUR_MOVE() { return " make your move!" }

    constructor(  
        resetGameBtn = 'resetgame',
        startGameBtn = 'startgame',
        gameDiv = 'gamediv',
        playersDiv = 'players',
        playerOneMessageSpan = 'playerone',
        playerTwoMessageSpan = 'playertwo',
        messageDiv = 'messages') {
            
        this.resetBtn = document.getElementById(resetGameBtn)
        this.startBtn = document.getElementById(startGameBtn)
        this.gameDiv = document.getElementById(gameDiv)
        this.playersDiv = document.getElementById(playersDiv)
        this.playerOneMessageSpan = document.getElementById(playerOneMessageSpan)
        this.playerTwoMessageSpan = document.getElementById(playerTwoMessageSpan)
        this.messageDiv = document.getElementById(messageDiv)

        this.events();

    }

    initializeNewGame(
        player1 = 'player 1', 
        player2  = 'player 2', 
      ) {
        this.player1 = new Player(player1, "player-one", "p1");
        this.player2 = new Player(player2, "player-two", "p2");
        this.players.push(this.player1)
        this.players.push(this.player2)

        this.playersDiv.style.display = 'block';
        this.playerOneMessageSpan.innerHTML = player1;
        this.playerTwoMessageSpan.innerHTML = player2;
      
        this.randomizePlayerTurn();
        this.showMessage(this.currentPlayer.name + Game.MAKE_YOUR_MOVE);

        this.board = new Board(6, 6, this);
      
    }

    randomizePlayerTurn() {
        if( Math.random() < 0.5) {
            this.currentPlayer = this.player1;
        } else {
            this.currentPlayer = this.player2;
        }
    }

    startGame() {
        this.board.showBoard();
    }

    player1() {
        return this.player1;
    }

    player2() {
        return this.player2;
    }

    changePlayer() {
        if(this.currentPlayer===this.player1) {
            this.currentPlayer = this.player2
        } else {
            this.currentPlayer = this.player1
        }
        this.showMessage(this.currentPlayer.name + ' make your move');
    }

    showMessage(message) {
        this.messageDiv.innerHTML = message;
    }

    events() {
        this.startBtn.addEventListener('click', () => 
        {
            this.startNewGame()
        })

        this.resetBtn.addEventListener('click', () => 
        {
            this.startNewGame()
            this.endGame('none', 'none')
        })

    }

    startNewGame() {
    
        this.initializeNewGame()
       
        this.endGame('none', 'inline')
        this.startGame()
    }

    endGame(startDisplay, resetDisplay) {
        this.startBtn.style.display = startDisplay;
        this.resetBtn.style.display = resetDisplay
        this.gameDiv.classList.remove('wonGame')
        this.won = false
    }

}