// Wait for DOM content to load
$(main)

function main(){
    addLandingListener();
}
function addLandingListener(){
    $("#submitUser").click(redirect);
}
function redirect(){
    console.log('clicked')
    let user = $("#username")[0].value;
    if (user){
        localStorage.setItem("user", user);
        window.open("game.html");
    }else{
        console.log("No user entered.")
    }
}