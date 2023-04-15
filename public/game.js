/*
Mark Ortega-Ponce
4/14/23
game.js
*/

// Call main when DOM content is loaded.
$(main);

function main(){
    addEventListeners();
    getRandomNumber();
    displayRecord();
}
/*
Add event listeners to submit button and play again.
*/
function addEventListeners(){
    $("#submitGuess").click(checkGuess);
    $("#playAgain").click(playAgain);
}
/* 
Make ajax request to random number endpoint. 
*/
function getRandomNumber(){
    $.ajax({
        // Change when not hosting on own computer...
        url:"http://localhost:3131/random",
        method: "GET",
        dataType: "json"
    }).done(function(data){
        //console.log(data);
        //console.log(data.randomNumber);
        //console.log(JSON.parse(data).randomNumber);
        sessionStorage.setItem("currentGame", JSON.parse(data).randomNumber);
        sessionStorage.setItem("currentGuesses", 0);
    });
}
/*
Check if guess is correct. State whether
guess is too low or too high.
*/
function checkGuess(){
    console.log("In check guess.");
    let guess = Number($("#guess")[0].value);
    if (!guess){
        return;
    }
    let currRandNum = sessionStorage.getItem("currentGame");
    let currentGuesses = Number(sessionStorage.getItem("currentGuesses"));
    console.log("Random number: " + currRandNum);
    console.log("Guess: " + guess);
    // Get dom element with hint id.
    let hint = $("#hint");
    let guessCounter = $("#currGuesses");
    currentGuesses += 1;
    sessionStorage.setItem("currentGuesses", currentGuesses);
    guessCounter.html("Guesses: " + currentGuesses);
    if (guess == currRandNum){
        hint.html(`You won the game in ${currentGuesses} moves!`);
        updateRecord();
        $("#playAgain").removeAttr("hidden", "");
        $("#submitGuess").attr("disabled");
        // call some function to ask if they want to play again!
    }else{
        if (guess < currRandNum){
            hint.html("Guess is too low!");
        }else{
            hint.html("Guess is too high!");
        }
    }
}
/*
Update users guessing game records.
*/
function updateRecord(){
    let guesses = sessionStorage.getItem("currentGuesses");
    let user = localStorage.getItem("user");
    let parsedUserRecord = JSON.parse(user);
    let record = parsedUserRecord.record;
    if (record != ""){
        if (guesses < record){
            parsedUserRecord.record = guesses;
            localStorage.setItem("user", JSON.stringify(parsedUserRecord));
        }
    }else{
        parsedUserRecord.record = guesses;
        localStorage.setItem("user", JSON.stringify(parsedUserRecord));
    }
}
/*
Display users record if available.
*/
function displayRecord(){
    let user = localStorage.getItem("user");
    let parsedUserRecord = JSON.parse(user);
    let record = parsedUserRecord.record;
    if (record != ""){
        $("#record").html(`All time record: ${record}`)
    }
}
/* 
Function to restart the game when game is won.
*/
function playAgain(){
    location.reload();
}