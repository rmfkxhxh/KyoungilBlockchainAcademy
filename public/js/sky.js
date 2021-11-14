let loginChecknum = 0

function visible(){
    let tmp = document.getElementById("login");
    if (tmp.style.display == "block") {
        tmp.style.display = "none";
    }
    else tmp.style.display = "block";
}

function alertLogin(){
    alert("로그인 후 사용 해주세요");
}