export default class Board {
    game = null;
    cells = []; 
    
    constructor(width=10, height=4, game) {
        this.width = width;
        this.height = height;
        this.game = game;
        this.initializeBoard();
    }

    initializeBoard() {
        this.game.gameDiv.style.gridTemplateColumns = "repeat(" + this.width + ", 1fr)"
        this.game.gameDiv.style.gridTemplateRows = "repeat(" + this.height + ", 1fr)"

        for (let r = 0; r < this.height; r++) {
            let row = [];
            for (let c = 0; c < this.width; c++) {
                row.push(null);
            }
            this.cells.push(row);
        }
    }

    showBoard() {
        this.game.gameDiv.innerHTML = "";
      
        const rem = this;
      
        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {

                let div = document.createElement("div");
                
                let cellbackground = '' 
                const cellContent = rem.cells[r][c];
                if(rem.cells[r][c]!=null) {
                   
                    rem.game.players.forEach(player => {
                        if(cellContent==player.sign)
                        {
                            cellbackground = player.color
                        } 
        
                    });

                }

                div.setAttribute("class", "item cell " + cellbackground);
                div.id = c + (r * this.height);
                div.dataset.column = c;
                div.dataset.row = r;
                
                if(rem.cells[r][c]!=null) {
                    div.innerHTML = rem.cells[r][c];
                }
               
                div.addEventListener("click", function() {
                    if(!rem.game.won) {

                       const moveAdded = rem.addToBoard(this.dataset.column, rem.game.currentPlayer.sign);

                       if(!!moveAdded) {
                           rem.showBoard();
   
                           let hasWon = rem.findWinner(rem.game.currentPlayer);
   
                           if(!!hasWon) {
                               rem.game.gameDiv.classList.add('wonGame')
                               rem.game.showMessage( rem.game.currentPlayer.name + ' har vundet!')
                               rem.game.won = true;
                               let resetBtn = document.getElementById('resetgame')
                               resetBtn.style.display = 'none'
                               let startBtn = document.getElementById('startgame')
                               startBtn.style.display = 'inline'
                           } else {
                               rem.game.changePlayer();
                           }
                       } else {
                           alert("denne kolonne er fyldt, stadig " + rem.game.currentPlayer.name);
                       }

                    }

                });

                div.addEventListener("mouseover", function(evt) {
                    let currentCol = evt.target.getAttribute("data-column");

                    //select all elements and remove previous elementmousehover classes
                    let allElements = Array.from(document.getElementsByClassName("elementmousehover"));
                    if(allElements.length>0) {
                        allElements.forEach(element => {
                            element.classList.remove('elementmousehover');
                            // element.classList.add('cell-hover');
                        });
                    }
                        
                    // add only on this column
                    let cols = document.querySelectorAll("[data-column='" + currentCol + "']");
                    cols.forEach(element => {
                        // element.classList.remove('cell-hover');
                        element.classList.add('elementmousehover');
                    });
                    
                });

                rem.game.gameDiv.appendChild(div);
            }         
        }
     }
        
    cellContentIsPlayer(r, c, playerName) {
        if(
            this.cells[r]!=undefined && 
            this.cells[r][c]!=undefined && 
            this.cells[r][c]!=null && 
            this.cells[r][c]==playerName ) {
            return true;
        }

        return false;
    }
                
    findWinner(player) {

        for (let r = 0; r < this.cells.length; r++) {
            
            for (let c = 0; c < this.cells[r].length; c++) {
                
                // test horizontal
                if(c < this.width-3) {
                    if(
                        this.cellContentIsPlayer(r, c, player.sign)
                        && this.cellContentIsPlayer(r, c + 1, player.sign)
                        && this.cellContentIsPlayer(r, c + 2, player.sign)
                        && this.cellContentIsPlayer(r, c + 3, player.sign)
                    ) {
                        return true;
                    }
                }

                // test vertically
                if(r < this.height-3) {

                    if(
                        this.cellContentIsPlayer(r, c, player.sign)
                        && this.cellContentIsPlayer(r + 1, c, player.sign)
                        && this.cellContentIsPlayer(r + 2, c, player.sign)
                        && this.cellContentIsPlayer(r + 3, c, player.sign)
                    ) {
                        
                        return true;
                    }
                }

                // test diagonally down right
                if(r < this.height - 3 && c < this.width - 3 ) {

                    if(
                        this.cellContentIsPlayer(r, c, player.sign)
                        && this.cellContentIsPlayer(r + 1, c + 1, player.sign)
                        && this.cellContentIsPlayer(r + 2, c + 2, player.sign)
                        && this.cellContentIsPlayer(r + 3, c + 3, player.sign)
                    ) {
                        
                        return true;
                    }
                }

                // test diagonally down left
                if(r < this.height - 3 && c >= 3 ) {
                

                    if(
                        this.cellContentIsPlayer(r, c, player.sign)
                        && this.cellContentIsPlayer(r + 1, c - 1, player.sign)
                        && this.cellContentIsPlayer(r + 2, c - 2, player.sign)
                        && this.cellContentIsPlayer(r + 3, c - 3, player.sign)
                    ) {
                        
                        return true;
                    }
                }

                // test diagonally down right
                if(r < this.height - 3 && c < this.width - 3 ) {

                    if(
                        this.cellContentIsPlayer(r, c, player.sign)
                        && this.cellContentIsPlayer(r + 1, c + 1, player.sign)
                        && this.cellContentIsPlayer(r + 2, c + 2, player.sign)
                        && this.cellContentIsPlayer(r + 3, c + 3, player.sign)
                    ) {
                        
                        return true;
                    }
                }
                
            }

        }

        return false;
    }
    
    getVacantRowInColumn(col) {
        let last = this.height - 1;
        for (let r = last; r >= 0; r--) {
            if(this.cells[r][col]==null) {
                return r;
            }
        }
        return null;
    }

    addToBoard(column, currentPlayer) {
        let vacantRow = this.getVacantRowInColumn(column)
        //console.log("spiller ", currentPlayer);
        if(vacantRow != null) {
            this.cells[vacantRow][column] = currentPlayer;          
            return true;
        } else {
            return false;
        }

    }

}