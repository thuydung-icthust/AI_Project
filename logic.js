let menu = document.querySelector("#menu-starter");
let button1 = document.querySelectorAll(".option-but");
function start(){
   menu.style.display = "none";
   document.getElementById("option").style.width = "100%";
}
// function back(){
//     menu.style.removeProperty("display");
//     document.getElementById("_table").innerText ="";
//     button[0].style.display = "none";
//     button[1].style.display ="none";
//     button[2].style.display ="none";
//     BoardStart.style.display ="none";
//     document.querySelector("#playing").style.display = "none";
// }
function continue_game(){
    document.getElementById("myNav").style.width = "0%";
    BoardStart.style.display = "none";
    document.getElementById("playing").style.display = "none";
    document.getElementById("_table").innerText ="";
    startGame();
}
function restart(){
    document.getElementById("myNav").style.width = "0%";
    BoardStart.style.display = "none";
    document.getElementById("playing").style.display = "none";
    document.getElementById("_table").innerText ="";
    startGame();
    document.getElementById("right-player").innerText = "0";
    document.getElementById("left-player").innerText = "0";
}
function backtoMenu(){
    document.getElementById("myNav").style.width = "0%";
    document.querySelector("#playing").style.display = "none";
    BoardStart.style.display = "none";
    menu.style.removeProperty("display");
    button1[0].style.display = "none";
    button1[1].style.display ="none";
    button1[2].style.display ="none";
    document.querySelector("#pausegame").style.width = "0%";
    document.getElementById("_table").innerText ="";
    document.getElementById("right-player").innerText = "0";
    document.getElementById("left-player").innerText = "0";
    document.getElementsByClassName("_player")[0].style.color = "#818181";
    document.getElementsByClassName("_player")[1].style.color = "#818181";
    let v = document.getElementsByClassName("sizeX");
    for(let i = 0 ; i < v.length ; i ++){
        v[i].style.color = "#818181";
    }
}
function pause(){
    document.querySelector("#pausegame").style.width = "100%";
}
function resume(){
    document.querySelector("#pausegame").style.width = "0%";
}
var sound = new Audio();         // create the audio
sound.src = "sound.wav";  // set the resource location 
sound.oncanplaythrough = function(){   // When the sound has completely loaded
    sound.readyToRock = true;    // flag sound is ready to play
                                   // I just made it up and can be anything
};
sound.onerror = function(){      // not required but if there are problems this will help debug the problem
    console.log("Sound file SoundFileURL.mp3 failed to load.")
};
function playSound(){
    if(sound && sound.readyToRock){  // check for the sound and if it has loaded
        sound.currentTime = 0;       // seek to the start
        sound.play();                // play it till it ends
    }
}
document.getElementById("content").style.height = "100%";
let boolean_type = 0;
let count_special = 0;
setInterval(function(){
    // if(innerWidth <= 375 ){
    //     let i = document.getElementById("rotate");
    //     i.style.width = "100%";
    //     i.style.background = "black";
    // }else{
    //     let i = document.getElementById("rotate");
    //     i.style.width = "0%";
    // }
    if(innerWidth >= 414){
        let i = document.getElementById("rotate");
            i.style.width = "0%";
    }
    
    if(sizeOfBoard == 5 && innerWidth >= 320 && innerWidth <= 414 ){
        document.getElementById("main").style.gridTemplateColumns = "12.5% 75% 12.5%";
    }else if(sizeOfBoard == 7 && innerWidth >= 320 && innerWidth <= 414 ){
        document.getElementById("main").style.gridTemplateColumns = "8% 82% 10%";
    }else if(sizeOfBoard ==3 && innerWidth >= 320 && innerWidth <= 414){
        document.getElementById("main").style.gridTemplateColumns = "20% 60% 20%";
    }
    if(innerWidth > 1500 && count_special == 0){
        let i = document.createElement('a');
        i.setAttribute('class','sizeX');
        i.setAttribute('id','s9');
        i.innerText = "9x9";
        i.addEventListener('click',special);
        document.getElementsByClassName("numberOfplayer")[1].appendChild(i);
        count_special++;
        boolean_type++;
    }
    if(innerWidth < 1500){
        if(boolean_type == 1){
            let i = document.getElementsByClassName("numberOfplayer")[1];
            i.removeChild(i.lastChild);
        }
        boolean_type=0;
        count_special = 0;
    }
},0);
function special(){
    size(9);
}
function hoverOver(){
    let cells = document.querySelectorAll('#tableX .cell');
    cells[this.id].innerText = count_hover;
    cells[this.id].style.opacity = "0.5";
} 
function hoverOut(){
    let cells = document.querySelectorAll('#tableX .cell');
    cells[this.id].innerText = "";
}