function visible(){
    let tmp = document.getElementById("login");

    if (tmp.style.display == "block") {
        tmp.style.display = "none";
    }
    else tmp.style.display = "block";
}

function invisible(e){
    document.body.style.zIndex = 2;
    if (document.getElementById("login").style.display="block");
    document.getElementById("login").style.display="none";
}

// function checkLoginInfo(id, pw){
//     if id
// }