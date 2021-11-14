const db = require('./database')
const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const mySqlStore = require("express-mysql-session")(session);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//쿠키 & session
const options = {
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: 'sqlpwd',      // Replace with your database password
  port: '3306',
  database: 'kba' // // Replace with your database Name
};
const sessionStore = new mySqlStore(options);

router.use(
  session({
    secret: "some secret key",
    store: sessionStore,
    resave:false,
    saveUninitialized:false,
  })
);


//form post용
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

//회원가입
router.get('/signup', function(req, res) {
  res.sendFile(path.join(__dirname, 'html', 'member.html'));
})
router.post('/add', urlencodedParser, function(req, res, next) {
  
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
    var sql = "INSERT INTO `users` (`userNo`, `userId`, `userPwd`, `userName`, `userMail`) VALUES (NULL, '" + id + "', '" + hash + "', '" + name + "', '" + mail + "')";
    var params = ['', id, hash, name, mail];
    db.query(sql, userDetails, function (err, data) { 
      if (err) throw err;
        console.log("User data mysql db업로드 성공"); 
    });
  });
  
  console.log('가입완료')
  res.redirect('/');  // redirect to user form page after inserting the data -->홈으로
}); 

router.post('/login', (req, res, next) => {
    param = [req.body.id, req.body.pw]
    db.query(`SELECT * FROM users WHERE userId='${param[0]}'`, (err, row) => {
      console.log(param[0])
      
      if(err) {
        console.log(param[0]);
        console.log(err);
      }
      if(row.length > 0) {
        console.log(row);
        bcrypt.compare(param[1], row[0].userPwd,(error, result) =>{
          if(result){
            console.log('로그인 성공');
          }else{
            console.log('로그인 실패')
          }
        })
      } else{
        console.log('ID가 존재하지 않습니다.')
      }
    })
    req.session.user = param[0];
    req.session.save(err => {
      if (err) {
        console.log(err);
        return res.status(500).send("<h1>500 error</h1>");
      }
    })
    res.redirect('/'); //로그인시도후 redirect url
  });

router.get('/', (req, res) => { // app 대신 router에 연결
  if(req.session.user !== undefined) { //session.user가 undefined가 아닐시
  console.log("session.user : ",req.session.user)
  return res.sendFile(path.join(__dirname, 'html', 'homepagelogin.html'));
  }
  else (res.sendFile(path.join(__dirname, 'html', 'homepage.html')));
});

router.get('/reserve', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'calendar3.html'));
});

router.get('/sugang', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'sugang.html'));
});

router.get('/sisul', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'sisul.html'));
});

router.get('/qna', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'question.html'));
});

router.get('/homepage', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'homepage.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'member.html'));
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router; // 모듈로 만드는 부분