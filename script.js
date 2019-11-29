var Board;
const humans = 'X';
const AIplayer = 'O';
var sizeOfBoard,cells;
var delayInMilliseconds = 500; //1 second
var BoardStart;
var winnerTemp;
var typeGame;
var turnPlayer;
var count_boolean = 0;
var count_hover;
var id_hover;
let win_Direction = [];


var choice_win_direct;
function size(choice){
    if(sizeOfBoard == undefined){
        count_boolean++;
    }
    sizeOfBoard = choice;
    let chosen = "s" + choice.toString();
    let e = document.querySelectorAll(".sizeX");
    e.forEach(element=>{
        if(element.getAttribute('id') == chosen){
            document.getElementById(element.getAttribute('id')).style.color = "#f1f1f1";
        }else{
            document.getElementById(element.getAttribute('id')).style.color = "#818181";
        }
    })
    
}

function createBoard(){
    for(let i = 0 ; i < sizeOfBoard ; i++){
        var node = document.createElement("tr");
        document.getElementById("_table").appendChild(node);
        let row = document.getElementById("_table").children;
        for(let j =0 ; j < sizeOfBoard ; j++){
            var block = document.createElement("td");
            block.setAttribute("class", "cell");
            block.setAttribute('id', i*sizeOfBoard +j);
            row[i].appendChild(block);
        }
    }
}

function option(type){
    if(typeGame == undefined){
        count_boolean++;
    }
    typeGame = type;
    if(type){
        document.getElementsByClassName("two-type")[0].style.display = "block";
        document.getElementsByClassName("two-type")[1].style.display = "block";
        document.getElementById("one").style.display = "none";
        document.getElementById("two").style.display = "block";
        document.getElementById("multi").style.color = "#f1f1f1";
        document.getElementById("single").style.color = "#818181";
        document.getElementById("playing").innerText = "Turn: Player 1";
    }
    else{
        document.getElementsByClassName("two-type")[0].style.display = "none";
        document.getElementsByClassName("two-type")[1].style.display = "none";
        document.getElementById("one").style.display = "block";
        document.getElementById("two").style.display = "none";
        document.getElementById("single").style.color = "#f1f1f1";
        document.getElementById("multi").style.color = "#818181";
        document.getElementById("playing").innerText = "Turn: Player";
    }
    
}
function go(){
    //console.log(count_boolean);
    if(count_boolean >= 2){
        document.getElementById("option").style.width = "0%";
        startGame();
    }else{
        alert("You have not chosen size Of Board or Type Game!!!");
    }
}
function startGame(){
    createBoard();
    option(typeGame);
    button1[0].style.display = "block";
    button1[1].style.display = "block";
    button1[2].style.display = "block";
    let cells = document.querySelectorAll('#tableX .cell');
    BoardStart = document.getElementById("tableX");
    BoardStart.style.display = "flex";
    BoardStart.style.flexDirection = "column";
    BoardStart.style.justifyContent = "center";
    count_hover = humans;
    turnPlayer = 0;
    Board = Array.from(Array(Math.pow(sizeOfBoard,2)).keys);
    for(let i = 0; i < Math.pow(sizeOfBoard,2); i++){
        cells[i].innerText = "";
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnclick, false);
        cells[i].addEventListener('mouseover', hoverOver, false);
        cells[i].addEventListener('mouseout', hoverOut,false);
    }
    arrayBig = [];
    win_Direction = [];
    if(sizeOfBoard == 3) getRightSeq(3)
    else if (sizeOfBoard == 5)
        getRightSeq(4);
    else
        getRightSeq(5);
    document.querySelector("#playing").style.display = "block";
    console.log(win_Direction);
}

function turnclick(cell){
    playSound();
    let gameWon;
    if(turnPlayer % 2 == 0 && typeGame){
         gameWon = turn(cell.target.id,humans);
         document.getElementById("playing").innerText = "Turn: Player 2";
    }else if(turnPlayer % 2 != 0 && typeGame){
         gameWon = turn(cell.target.id,AIplayer);
         document.getElementById("playing").innerText = "Turn: Player 1";
    }else{
        gameWon = turn(cell.target.id,humans);
    }
    turnPlayer++;
    let true_id = "#tableX" + " " + "table" + " " + "td";
    if(!gameWon && !typeGame){
        document.querySelector("#playing").innerText = "Turn: Computer";
        true_id = document.querySelectorAll(true_id);
        for(let i = 0 ; i < Math.pow(sizeOfBoard,2); i++){
            true_id[i].removeEventListener('click', turnclick, false);
            true_id[i].removeEventListener('mouseover', hoverOver, false);
            true_id[i].removeEventListener('mouseout', hoverOut, false);
        }
        if(!checkTie()){
        setTimeout(function() {
        //your code to be executed after 1 second
        
            for(let i = 0 ; i < Math.pow(sizeOfBoard,2); i++){
                if(!(Board[i] == humans || Board[i] == AIplayer)){
                    true_id[i].addEventListener('click',turnclick, false);
                }
            }
            turn(bestSpot(Board,AIplayer), AIplayer);
            playSound();
        document.querySelector("#playing").innerText = "Turn: Player";
             }, delayInMilliseconds);
            }
            setTimeout(function(){
                for(let i = 0 ; i < Math.pow(sizeOfBoard,2); i++){
                    if(Board[i] == undefined){
                        true_id[i].addEventListener('mouseover', hoverOver, false);
                        true_id[i].addEventListener('mouseout', hoverOut, false);
                    }
                }
            },500);
        }
        //document.getElementById(playbut).addEventListener('click', restart);     
}

function turn(id, player){
    document.querySelectorAll('#tableX .cell')[id].removeEventListener('mouseover', hoverOver,false);
    document.querySelectorAll('#tableX .cell')[id].removeEventListener('mouseout', hoverOut,false);
    document.querySelectorAll('#tableX .cell')[id].style.opacity = "1";
    Board[Number(id)] = player;
    (count_hover === humans) ? count_hover = AIplayer : count_hover = humans;
    let true_id = "#tableX" + " " + "table" + " " + "td";
    true_id = document.querySelectorAll(true_id);
    true_id[id].innerText = player;
    //true_id[id].style.background = "red";
    true_id[id].removeEventListener('click', turnclick, false);
    let gameWon = checkWin(Board);
    if(gameWon[1]){
        for(let i = 0 ;i < Math.pow(sizeOfBoard,2) ;i++){
            document.getElementById(i).removeEventListener('click', turnclick , false);
        } 
        (player == humans) ? document.getElementById("left-player").innerText = Number(document.getElementById("left-player").innerText) + 1:document.getElementById("right-player").innerText = Number( document.getElementById("right-player").innerText) + 1;
        let count_time = 0;
        while(count_time <=3){
            if(count_time % 2 == 0){
                setTimeout(() => {
                    gameWon[0].forEach((element)=>{
                        document.getElementById(element).style.transition = "all 0.7s linear";
                        document.getElementById(element).style.transform = "scale(1.3)";
                    })
                }, 700*(count_time+1));
            }else{
                setTimeout(() => {
                    gameWon[0].forEach((element)=>{
                        document.getElementById(element).style.transition = "all 0.7s linear";
                        document.getElementById(element).style.transform = "scale(1)";
                    }) 
                }, 700*(count_time+1));
            }
            count_time++;
        }
        setTimeout(() => {
            declareWinner(player);
        }, 3000); 
    }
    return gameWon[1];
}

function checkWin(Board1){
    // Phần này chắc dễ hiểu =))
    let check = 0;
    let length_win;
    let win_seq;
    if(sizeOfBoard == 3)
        length_win = 3;
    else if(sizeOfBoard == 5)
        length_win = 4;
    else
        length_win =5;
        win_Direction.forEach(element=>{
            let num_X = 0;
            let num_O = 0;
            element.forEach(pos=>{
                if(Board1[pos] == humans)
                    num_X++;
                else if(Board1[pos] == AIplayer)
                    num_O++;
            })
            if((num_X == length_win && num_O == 0) || (num_X == 0 && num_O == length_win)){
                check = 1;
                win_seq = element;
                return [win_seq,true];
            }
        })
    if(check)
        return [win_seq,true];
    else   
        return [0,false];
}
function checkTie(){
    for(let i = 0 ; i < Math.pow(sizeOfBoard,2) ;i++){
        if(Board[i] == undefined){
            return false;
        }
    }
    let count_time = 0;
    while(count_time <= 3){
        if(count_time % 2 == 0){
            setTimeout(() => {
                for(let i = 0 ; i < Math.pow(sizeOfBoard,2) ; i++){
                    document.getElementById(i).style.transition = "all 0.7s linear";
                    document.getElementById(i).style.transform = "scale(1.3)";
                }
            }, 700*(count_time+1));
        }else{
            setTimeout(() => {
                for(let i = 0 ; i < Math.pow(sizeOfBoard,2) ; i++){
                    document.getElementById(i).style.transition = "all 0.7s linear";
                    document.getElementById(i).style.transform = "scale(1)";
                }
            }, 700*(count_time+1));
        }
        count_time++;
    }
    setTimeout(() => {
        declareWinner("Tie Game!!!");
    }, 3500); 
    return true;
}
function declareWinner(player){
    document.getElementById("myNav").style.width = "100%";
    if(!typeGame){
        if(player == humans){
            document.getElementById("winner-player").innerText =   "You Win!";
        }else if(player == AIplayer){
            document.getElementById("winner-player").innerText =   "You Lose";
        }else{
            document.getElementById("winner-player").innerText =   player;
        }
    }else{
        if(player == humans){
            document.getElementById("winner-player").innerText =   "Player 1 Win";
        }else if(player == AIplayer){
            document.getElementById("winner-player").innerText =   "Player 2 Win";
        }else{
            document.getElementById("winner-player").innerText =   player;
        }
    }
}



function find_min(list){
    let min = Infinity;
    let node_chose = [];
    list.forEach(element=>{
        if(element[1] < min){
            node_chose = element;
            min = element[1];
        }
    });
    return node_chose;
}
function find_max(list){
    let max = -Infinity;
    let node_chose = [];
    list.forEach(element=>{
        if(element[1] > max){
            node_chose = element;
            max = element[1];
        }
    });
    return node_chose;
}
function Find_available_node(_Board){
    let list = [];
    for(let i = 0 ; i < Math.pow(sizeOfBoard,2);i++){
        if(_Board[i] === undefined)
            list.push(i);
    }
    return list;
}

function _checkTie(_Board){
    for(let i = 0 ; i < Math.pow(sizeOfBoard,2) ;i++){
        if(_Board[i] === undefined){
            return false;
        }
    }
    return true;
}

function bestSpot(_Board,player){
       if (Find_available_node(_Board).length < 10)
        return alpha_beta_pruning(_Board,0,AIplayer,-1000,1000)[0];
        else
            return eval(_Board);
}

let count = 0;
// Not done please consider more about alpha beta
function alpha_beta_pruning(_Board,depth,player,alpha,beta){
    
    count++; // Count how many times the function called
    let list = Find_available_node(_Board);
    let list_return_value = [];
    for(let i = 0 ; i < list.length ; i++){
        let _boardCopy = [..._Board];
        _boardCopy[list[i]] = player;
        if(checkWin(_boardCopy)[1]){
            if(player == AIplayer)
                list_return_value.push([list[i],1]);
            else
            list_return_value.push([list[i],-1]);
        }else if(_checkTie(_boardCopy)){
            list_return_value.push([list[i],0]);
        }
        else{
                let value = alpha_beta_pruning(_boardCopy,depth+1,player == AIplayer ? humans : AIplayer,alpha,beta);
                list_return_value.push([list[i],value[1]]);
                if(player === AIplayer){
                    alpha  = Math.max(alpha,value[1]);
                }else{
                    beta = Math.min(beta,value[1]);
                }
        }
        if(alpha >= beta)
            break;
    }
    if(player === AIplayer){
        return find_max(list_return_value);
    }else{
        return find_min(list_return_value);
    }
}
// Hàm đánh giá điểm của từng states mà O được điền vào từng ô trống
function eval(_Board){
    let list = Find_available_node(_Board);
    let list_return_value = [];
    list.forEach(element=>{
        let Board_copy = [..._Board];
        Board_copy[element] = AIplayer;
        list_return_value.push([Point(Board_copy),element]);
    })
    let max = [-Infinity,1];
    for(let i = 0 ; i < list_return_value.length ; i++){
        if(list_return_value[i][0] > max[0])
            max = list_return_value[i];
    }
    return max[1];
}

function Point(_Board){
    let point = 0;
    win_Direction.forEach(element=>{
        let num_O = 0;
        let num_X = 0;
      for(let i = 0 ; i < element.length ; i++){
        if(_Board[element[i]] == humans)
            num_X++;
        else if(_Board[element[i]] == AIplayer)
            num_O++;
      } 
        point += calculate(num_X,num_O);
    })
    return point;
}
//Hàm tính điểm dựa vào số lượng X,O trong row col diag 
function calculate(numX,numO){
    let length_win;
    if(sizeOfBoard == 3)
        length_win = 3;
    else if(sizeOfBoard == 5)
        length_win = 4;
    else
        length_win =5;
    let point = 0;
    if(numX == length_win-1 && numO == 0)
        point-=1000;
    else if(numO == length_win)
        point+=3000;
    else if(numO > 0)
        point++;
    else if(numX == length_win-2 && numO == 0)
        point-=2000;
    else if(numO == length_win-2 && numX ==0)
        point++;
    return point;
}

// For logic behavior


function getRightSeq(length_win){
    diagonal(length_win);
    horizon(length_win);
    vertical(length_win);
    arrayBig.forEach(Element=>{
        let array1 = [...Element];
        while(array1.length >= length_win){
            
            let array_temp = [];
            for(let i = 0 ; i < length_win ; i++){
                array_temp.push(array1[i]);
            }
            win_Direction.push(array_temp);
            array1.shift();
            
        }
    })
}
let arrayBig = [];
// Create Win Direction
function diagonal(length_win){
    let temp_value;
    let run_value = 0;
    //Left to Right
    while(run_value < Math.pow(sizeOfBoard,2)){
        let array_temp =[];
        temp_value = run_value;
        array_temp.push(temp_value);
        temp_value -= (sizeOfBoard -1);
        while(temp_value > 0){
            array_temp.push(temp_value);
            temp_value -= (sizeOfBoard -1);
        }
        if(Math.pow(sizeOfBoard,2) - 1 in array_temp)
            array_temp.push(0);
        run_value += sizeOfBoard;
        if(array_temp.length >= length_win){
            arrayBig.push(array_temp);
        }
    }
     run_value -= sizeOfBoard -1;
     let limit_value = (2*sizeOfBoard -1);
    // Continue with half left
    while(run_value < Math.pow(sizeOfBoard,2)){
        let array_temp = [];
        temp_value = run_value;
        array_temp.push(temp_value);
        temp_value -= (sizeOfBoard -1);
        while(temp_value >= limit_value){
            array_temp.push(temp_value);
            temp_value -= (sizeOfBoard -1);
        }
        limit_value += sizeOfBoard;
        if(Math.pow(sizeOfBoard,2) -1 in array_temp)
            array_temp.push(0);
        run_value += 1;
        if(array_temp.length >= length_win){
            arrayBig.push(array_temp);
        }
    }
    // From Right to LEft
    run_value = sizeOfBoard -1;
    while(run_value < Math.pow(sizeOfBoard,2)){
        let array_temp =[];
        temp_value = run_value;
        array_temp.push(temp_value);
        temp_value -= (sizeOfBoard +1);
        while(temp_value >= 0){
            array_temp.push(temp_value);
            temp_value -= (sizeOfBoard +1);
        }
        run_value += sizeOfBoard;
        if(array_temp.length >= length_win){
            arrayBig.push(array_temp);
        }
    }
    run_value -= sizeOfBoard +1;
    limit_value = sizeOfBoard;
    // Continue with half left
    while( run_value > Math.pow(sizeOfBoard,2) - sizeOfBoard){
        let array_temp = [];
        temp_value = run_value;
        array_temp.push(temp_value);
        temp_value -= (sizeOfBoard +1);
        while(temp_value >= limit_value){
            array_temp.push(temp_value);
            temp_value -= (sizeOfBoard +1);
        }
        limit_value += sizeOfBoard;
        run_value -= 1;
        if(array_temp.length >= length_win){
            arrayBig.push(array_temp);
        }
     }
    return arrayBig;
}
function horizon(length_win){
    let run_value = 0;
    let temp_value;
    let limit_value = sizeOfBoard -1;
    while(run_value <= Math.pow(sizeOfBoard,2) - sizeOfBoard){
        let array_temp = [];
        temp_value = run_value;
        array_temp.push(temp_value);
        temp_value++;
        while(temp_value <= limit_value){
            array_temp.push(temp_value);
            temp_value++;
        }
        limit_value += sizeOfBoard;
        arrayBig.push(array_temp);
        run_value += sizeOfBoard;
    }
}
function vertical(){
    let run_value = 0;
    let temp_value;
    let limit_value = Math.pow(sizeOfBoard,2) - sizeOfBoard;
    while(run_value <= sizeOfBoard -1){
        let array_temp = [];
        temp_value = run_value;
        array_temp.push(temp_value);
        temp_value+=sizeOfBoard;
        while(temp_value <= limit_value){
            array_temp.push(temp_value);
            temp_value+=sizeOfBoard;
        }
        limit_value += 1;
        arrayBig.push(array_temp);
        run_value += 1;
    }
}
function ChangeWeb(index){
    if(!index){
        window.location.href = "howtoplay.html";
    }else{
        window.location.href = "about.html";
    }
}