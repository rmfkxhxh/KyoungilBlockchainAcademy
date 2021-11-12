const express = require('express');
const session = require('express-session');
const db = require('./database')
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });


//form post용
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

//회원가입
router.get('/registration', function(req, res) {
  res.sendFile(path.join(__dirname, 'html', 'member.html'));
})
router.post('/form', urlencodedParser, function(req, res, next) {
  
  // store all the user input data
  const userDetails=req.body;
  console.log(userDetails)
  // <!-- userId, userPwd, userName, userMail
  var id = req.body.userId;
  var pwd = req.body.userPwd;
  var name = req.body.userName;
  var mail = req.body.userMail;



  bcrypt.hash(pwd, null, null, function(err, hash) {
     // insert user data into users table
    var sql = "INSERT INTO `users` (`idNumber`, `userId`, `userPwd`, `userName`, `userMail`) VALUES (NULL, '" + id + "', '" + hash + "', '" + name + "', '" + mail + "')";
    var params = ['', id, hash, name, mail];
    db.query(sql, userDetails, function (err, data) { 
      if (err) throw err;
        console.log("User data is inserted successfully "); 
    });
  });
  
  console.log('after post form')
  res.redirect('/');  // redirect to user form page after inserting the data -->홈으로
}); 

router.post('/login', (req, res, next) => {
    param = [req.body.id, req.body.pwd]
    // console.log(req.body.id, req.body.pwd)
    db.query(`SELECT * FROM users WHERE userId='${param[0]}'`, (err, row) => {
      console.log(param[0])
      
      if(err) {
        // console.log(req.body.pwd, row[0].userPwd, 'row =', row);
        console.log(param[0]);
        console.log(err);
        // continue;
      }
      if(row.length > 0) {
        console.log(row);
        bcrypt.compare(param[1], row[0].userPwd,(error, result) =>{
          if(result){
            var userData = req.session.loginData;
            req.session.save(error => {if(error) console.log(error)})
            // res.json({message: 'success'})
            console.log('로그인 성공');
            // res.redirect('/login')
            // res.redirect(history.back())
            // res.send('<script>alert("로그인 성공");</scriptype=>');
          }else{
            // res.write('<script type="text/javascript">alert("로그인 실패");location.href="/#";</script>');
            console.log('로그인 실패')
            // res.json({message: 'fail'})
            // res.redirect(history.back())
            // res.redirect('/loginfail')
          }
        })
      } else{
        // res.send('<script type="text/javascript">alert("ID가 존재하지 않습니다.");</script>');
        console.log('ID가 존재하지 않습니다.')
        // res.redirect(history.back())
        // res.send('<script>alert("ID 없음");</scriptype=>');
      }
    })
    res.redirect('/'); //로그인시도후 redirect url
  });



router.get('/', (req, res) => { // app 대신 router에 연결
  // if(req.session.loginData){
  //   // res.send({loggedIn: true, loginData: req.session.loginData});
  //   res.sendFile(path.join(__dirname, 'html', 'homepage.html'));
  // }else{
  //   // res.send({loggedIn: false});
  //   res.sendFile(path.join(__dirname, 'html', 'homepage.html'));
  // }
  res.sendFile(path.join(__dirname, 'html', 'homepage.html'));
});

router.get('/login', (req, res) => {
  // if(req.session.loginData){
  //   // res.send({loggedIn: true, loginData: req.session.loginData})
  //   // res.write('<script type="text/javascript">alert("로그인 실패");location.href="/#";</script>');
  //   res.sendFile(path.join(__dirname, 'html', 'login.html'))
  // }else{
  //   // res.write('<script type="text/javascript">alert("로그인 실패");location.href="/#";</script>');
  //   // res.send({loggedIn: false})
  //   res.sendFile(path.join(__dirname, 'html', 'login.html'));
  // }
  res.sendFile(path.join(__dirname, 'html', 'login.html'));
});

router.get('/reserve', (req, res) => {
  // if(req.session.loginData){
  //   res.send({loggedIn: true, loginData: req.session.loginData})
  // }else{
  //   res.send({loggedIn: false})
  // }
  res.sendFile(path.join(__dirname, 'html', 'calendar3.html'));
});

router.get('/sugang', (req, res) => {
  // if(req.session.loginData){
  //   // res.send({loggedIn: true, loginData: req.session.loginData})
  //   res.sendFile(path.join(__dirname, 'html', 'sugang.html'));
  // }else{
  //   // res.send({loggedIn: false})
  //   res.sendFile(path.join(__dirname, 'html', 'sugang.html'));
  // }
  res.sendFile(path.join(__dirname, 'html', 'sugang.html'));
});

router.get('/sisul', (req, res) => {
  // if(req.session.loginData){
  //   // res.send({loggedIn: true, loginData: req.session.loginData})
  //   res.sendFile(path.join(__dirname, 'html', 'sisul.html'));
  // }else{
  //   // res.send({loggedIn: false})
  //   res.sendFile(path.join(__dirname, 'html', 'sisul.html'));
  // }
  res.sendFile(path.join(__dirname, 'html', 'sisul.html'));
});

router.get('/qna', (req, res) => {
  // if(req.session.loginData){
  //   // res.send({loggedIn: true, loginData: req.session.loginData})
  //   res.sendFile(path.join(__dirname, 'html', 'sisul.html'));
  // }else{
  //   // res.send({loggedIn: false})
  //   res.sendFile(path.join(__dirname, 'html', 'sisul.html'));
  // }
  res.sendFile(path.join(__dirname, 'html', 'question.html'));
});

router.get('/reserve', (req, res) => {
  // if(req.session.loginData){
  //   // res.send({loggedIn: true, loginData: req.session.loginData})
  //   res.sendFile(path.join(__dirname, 'html', 'sisul.html'));
  // }else{
  //   // res.send({loggedIn: false})
  //   res.sendFile(path.join(__dirname, 'html', 'sisul.html'));
  // }
  res.sendFile(path.join(__dirname, 'html', 'calendar3.html'));
});

router.get('/homepage', (req, res) => {
  // if(req.session.loginData){
  //   // res.send({loggedIn: true, loginData: req.session.loginData})
  //   res.sendFile(path.join(__dirname, 'html', 'sisul.html'));
  // }else{
  //   // res.send({loggedIn: false})
  //   res.sendFile(path.join(__dirname, 'html', 'sisul.html'));
  // }
  res.sendFile(path.join(__dirname, 'html', 'homepage.html'));
});


// // login-router.js 
// var controller_main = require("./login-controller"); 

// // 로그인 라우터 
// router.get("/login", function(req,res){ 
//     res.sendFile(path.join(__dirname , "./login.html")); 
// }); 
// router.post("/login", async function(req,res){ 
//     // 로그인 확인을 위해 컨트롤러 호출 
//     var result = await controller_main.SignIn(req,res); res.send(result); 
// }); 

// // 로그아웃 
// router.get("/logout", function(req,res){ 
//     console.log("clear cookie"); 
//     // 로그아웃 쿠키 삭제 
//     res.clearCookie('userid'); 
//     res.clearCookie('username'); 
//     // 세션정보 삭제 
//     console.log("destroy session"); 
//     req.session.destroy(); 
//     res.sendFile(path.join(__dirname , 'html', "login.html")); 
// }); 
// // 회원가입 
// router.get("/registration", function(req,res){ 
//     res.sendFile(path.join(__dirname , 'html', "member.html")); 
// }); 
// router.post("/form", async function(req,res){
// // 회원가입 컨트롤러 호출 
// var result = await controller_main.SignUp(req,res); 
// res.send(result); 
// }); 


// router.get('/member', (req, res) => {
//   res.sendFile(path.join(__dirname, 'html', 'member.html'));
// });

// res.redirect('/')

module.exports = router; // 모듈로 만드는 부분