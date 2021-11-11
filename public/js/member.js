function checkId() {
  var idtxt = document.getElementById("user_ID");
  var id = idtxt.value;
  var status = document.getElementById("user_IDcheck");
  //정규표현식을 활용한 유효성 검사
  //id pwd
  var regExp1 = /^[a-zA-Z0-9]{4,12}$/;
  if (!regExp1.test(id)) {
    status.value = "형식에 맞춰서 ID를 입력해줘용";
    idtxt.value="";
    idtxt.focus();
    return false;
  }
  status.value = "사용 가능한 아이디입니다.";
  return true;
}
function checkPwd() {
  var idtxt = document.getElementById("user_ID");
  var id = idtxt.value;
  var pwdtxt1 = document.getElementById("user_PW1");
  var pwdtxt2 = document.getElementById("user_PW2");
  var pwd1 = pwdtxt1.value;
  var pwd2 = pwdtxt2.value;
  var status = document.getElementById("user_PWcheck");
  //정규표현식을 활용한 유효성 검사
  //id pwd

  // console.log(pwdtxt1, pwdtxt2)
  var regExp1 = /^[a-zA-Z0-9]{4,12}$/;

  if (!regExp1.test(pwd1)) {
    status.value = "영문 대소문자와 숫자만 입력해 주세요.";
    pwdtxt1.value="";
    pwdtxt2.value="";
    pwdtxt1.focus();
    return false;
  }
  if (!(pwd1.slice(0, pwd1.length) === pwd2.slice(0, pwd2.length))) {
    status.value = "비밀번호가 다릅니다.";
    pwdtxt1.value = "";
    pwdtxt2.value = "";
    pwdtxt2.focus();
    return false;
  }
  if ((pwd2.slice(0, pwd2.length) === id.slice(0, id.length))) {
    status.value = "비밀번호가 ID와 똑같을 수 없습니다.";
    pwdtxt1.value = "";
    pwdtxt1.focus();
    pwdtxt2.value = ""; 
    pwdtxt2.focus();
    return false;
  }
  status.value = "사용가능한 비밀번호입니다.";
  return true;
}

function checkAndSubmitForm(f) { 
  var nametxt = document.getElementById("user_name");
  var emailtxt = document.getElementById("user_email");
  var name = nametxt.value;
  var mail = emailtxt.value;

  //정규표현식을 활용한 유효성 검사
  //email
  var regExp2 = /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/i;
  //namne
  var regname = /^[가-힝]{2,}$/;

  if (!regExp2.test(mail)) {
    alert("이메일 형식 다시 확인하세영.");
    emailtxt.value = "";
    emailtxt.focus();
    return false;
  }
  if (!regname.test(name)) {
    alert("이름 똑띠 쓰세용");
    nametxt.value = "";
    nametxt.focus();
    return false;
  }
  alert("회원가입이 완료되었습니다.")
  window.location.href = '/login';
  return true;
}
