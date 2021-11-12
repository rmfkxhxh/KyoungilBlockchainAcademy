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

function checkLoginInfo(id, pw){
    //자동로그인을 원하는지 체크
    //database에 id가 있는경우
    //id, pw가 일치할때
    alert("location.href")
    //id, pw가 일치x
    alert("잘못된 정보입니다.")
    //database에 id가 없는 경우
}