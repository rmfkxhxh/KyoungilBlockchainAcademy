let loginChecknum = 0

function visible(){
    let tmp = document.getElementById("login");
    if (tmp.style.display == "block") {
        tmp.style.display = "none";
    }
    else tmp.style.display = "block";
}

// function invisible(e){
//     document.body.style.zIndex = 2;
//     if (document.getElementById("login").style.display="block");
//     document.getElementById("login").style.display="none";
// }

// function checkLoginInfo(id, pw){
//     let getInfo = localStorage.getItem(id);
//     console.log(getInfo);
//     if (getInfo==null) {
//         alert("잘못된 정보입니다.");
//         document.getElementById("text").value="";
//         document.getElementById("password").value="";
//         // console.log(document.getElementById("text").value);
//     }

//     else {
//         let lSPwd = getInfo.split('/');
//         console.log(lSPwd);
//         if (lSPwd[0] == pw) {
//             console.log(lSPwd);
//             localStorage.setItem(id, lSPwd.join('/'));
//             loginChecknum = 1;
//             alert("환영합니다!!");
//             loginChecknum = 1
//             document.location.href = "../html/homepage1.html";
//         }
//         else {
//             alert("정보가 일치하지 않습니다.")
//             document.getElementById("text").value="";
//             document.getElementById("password").value="";
//         }
//         console.log(localStorage.getItem(id));
//     }
//     // else 
// }

// if (loginChecknum==1){
//     document.getElementById("myPage").display = "block";
//     document.getElementById("logout-tag").display = "block";
//     document.getElementById("login-tag").display = "none";
// } else {
//     document.getElementById("myPage").display = "none";
//     document.getElementById("logout-tag").display = "none";
//     document.getElementById("login-tag").display = "block";
// }

// function logout(){
//     loginChecknum = 1;
//     document.location.href = "../html/homepage.html";
// }

// console.log("loginChecknum: "+ loginChecknum);

// export {loginChecknum};

function alertLogin(){
    alert("로그인 후 사용 해주세요");
}