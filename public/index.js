/*
Mark Ortega-Ponce
4/14/23
index.js
*/

// Wait for DOM content to load
$(main)

/*
Entry point of program.
*/
function main(){
    checkIfPlayed();
    addLandingListener();
}
/*
Add event listeners to button
*/
function addLandingListener(){
    $("#submitUser").click(redirect);
}
/*
Redirect user to gussing game.
*/
function redirect(){
    console.log('clicked')
    let user_input = $("#username")[0].value;
    if (user_input == ""){
        alert("No user entered.");
        return;
    }
    let json = JSON.parse(localStorage.getItem("user"));
    if (json){
        var user = json.user;
    }else{
        var user = "";
    }
    if (user != user_input){
        let obj = {
            "user": user_input,
            "record": ""
        }
        localStorage.setItem("user", JSON.stringify(obj));
        window.open("game.html", target="_self");
    }else{
        //https://developer.mozilla.org/en-US/docs/Web/API/Window/open
        window.open("game.html", target="_self");
    }
}
/* 
Check if user has played yet and display records if they have. 
*/
function checkIfPlayed(){
    let user = localStorage.getItem("user");
    let userRecords = $("#prevRecords");
    if (user){
        let json = JSON.parse(user);
        let record = json.record;
        if (record != ""){
            userRecords.removeAttr("hidden");
            userRecords.html(`Hello ${json.user}! Your previous record is ${record} guesses. Try to beat it!`);
        }
    }
}