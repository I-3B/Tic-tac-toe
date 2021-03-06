const display=(()=>{
    const displayMessage=document.createElement('div');
    const firstPlayerName=document.querySelector('#first-player');
    const secondPlayerName=document.querySelector('#second-player');
    const scoreDisplay=document.querySelector('#score');
    displayMessage.setAttribute('id','message-background');
    function getCells(){
        return document.querySelectorAll('.cell');
    }
    function message(player){
        displayMessage.innerHTML=`
        <div id="message-container">
            <p id="message"></p>
            <span class="message-button" id="again">Again</span>
            <span class="message-button" id="reset">Reset</span>
        </div>`;

        document.body.appendChild(displayMessage);
        const msg=document.querySelector('#message');
        if(player==null)
        msg.textContent=`Tie.`;
        else
        msg.textContent=`${player.name} is the winner!`;
        
        display.again=document.querySelector('#again');
        reset=document.querySelector('#reset');
        again.addEventListener('click',nextGame);
        reset.addEventListener('click',resetGame);
    }
    function resetGame(){
        board.reset();
        clearBoard();
        displayMessage.remove();
    }
    function nextGame(){
        board.nextGame();
        clearBoard();
        displayMessage.remove();
    }
    function clearBoard(){
        getCells().forEach(e=>e.textContent='');
    }
    function setMenu(p1,p2){
        firstPlayerName.textContent=`${p1.name} : ${p1.value}`;
        secondPlayerName.textContent=`${p2.name} : ${p2.value}`;
        scoreDisplay.textContent=`${p1.wins} - ${p2.wins}`;
        switchTurn(p1);
    }
    function switchTurn(p1){
        if(p1.turn){
        firstPlayerName.setAttribute('style','color:rgb(60, 255, 0);');
        secondPlayerName.setAttribute('style','color:var(--cell-color');
        }
        else{
        secondPlayerName.setAttribute('style','color:rgb(60, 255, 0);');
        firstPlayerName.setAttribute('style','color:var(--cell-color');
        }
    }
    return {switchTurn,getCells,message,resetGame,setMenu};
})();


const player=(turn,name,preWins)=>{
    var wins=preWins;
    var value=(turn)?'X':'O';
    function isWinner(){
        let arr=board.getBoardValues();
        console.log(arr);
        if(
        [arr[0],arr[1],arr[2]].every(e=>e==this.value)||
        [arr[3],arr[4],arr[5]].every(e=>e==this.value)||
        [arr[6],arr[7],arr[8]].every(e=>e==this.value)||

        [arr[0],arr[3],arr[6]].every(e=>e==this.value)||
        [arr[1],arr[4],arr[7]].every(e=>e==this.value)||
        [arr[2],arr[5],arr[8]].every(e=>e==this.value)||

        [arr[0],arr[4],arr[8]].every(e=>e==this.value)||
        [arr[2],arr[4],arr[6]].every(e=>e==this.value)
        ){
            return `${name} is winner`;
        }
        return '';
    }
    return {turn,isWinner,value,name,wins};
};

const board=(()=>{
    'use strict';

    var turnCounter=0;
    var p1=player(true,'player 1',0);
    var p2=player(false,'player 2',0);
    var boardValues=new Array(9);
    var cells=display.getCells();

    cells.forEach(cell=>cell.addEventListener('click',turn(cell)));
    display.setMenu(p1,p2);

    function turn(cell){
        return function(){
            if(cell.textContent==''){
                let value=turnValue();
                cell.textContent=value;
                boardValues[parseInt(cell.id)]=value;
                turnCounter++;
                if(p1.turn){
                    if(p1.isWinner()){
                        display.message(p1);
                        p1.wins++;
                    }
                }

                else{
                    if(p2.isWinner()){
                        display.message(p2);
                        p2.wins++;
                    }
                }

                if(turnCounter==9&&!p1.isWinner()&&!p2.isWinner())
                display.message(null);

                switchTurn();
                display.switchTurn(p1);
            }
        }
    }

    function turnValue(){
        if(p1.turn)return p1.value;
        else return p2.value;
    }

    function switchTurn(){
        p1.turn=!p1.turn;
        p2.turn=!p2.turn;
    }

    function reset(){
        boardValues=new Array(9);
        turnCounter=0;
        p1=player(true,'player 1',0);
        p2=player(false,'player 2',0);
        display.setMenu(p1,p2);
    }
    function nextGame(){
        boardValues=new Array(9);
        turnCounter=0;
        p1=player(p1.turn,'player 1',p1.wins);
        p2=player(p2.turn,'player 2',p2.wins);
        if(p1.turn){
            p1.value='X';
            p2.value='O';
        }
        else{
            p1.value='O';
            p2.value='X';
        }
        display.setMenu(p1,p2);
    }

    const getTurnCounter=()=>turnCounter;
    const getBoardValues=()=>boardValues;
    return {nextGame,getBoardValues,p1,p2, getTurnCounter,reset};
})();   


