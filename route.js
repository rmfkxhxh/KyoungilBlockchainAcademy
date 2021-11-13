const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', (req, res) => { // app 대신 router에 연결
  res.sendFile(path.join(__dirname, 'html', 'homepage.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'login.html'));
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


// router.get('/member', (req, res) => {
//   res.sendFile(path.join(__dirname, 'html', 'member.html'));
// });

var test = require('./public/js/calendar1.js'); 
test();
//eval(fs.readFileSync('', 'utf-8'));
//console.log(pickOccupiedSeat());

//calendar
var dbcal = require('./database');

router.get('/registration', function(req, res) {
  res.sendFile(path.join(__dirname, 'html', 'calendar3.html'));
})
router.post('/form', urlencodedParser, function(req, res, next) {

  let dateRoomSeat=req.body;
  console.log(dateRoomSeat);
  var date = req.body.date;
  var room = req.body.room;
  var seat = req.body.seat;
  
  bcrypt.hash(date, null, null, function(err, hash) {
    // insert user data into users table
   var sql = "INSERT INTO `seats` (`date`, `room`, `seat`) VALUES (NULL, '" + date + "', '" + room + "', '" + seat + "')";
   var params = ['', date, room, seat];
   db.query(sql, dateRoomSeat, function (err, data) { 
     if (err) throw err;
       console.log("Seat info is inserted successfully "); 
   });
 });
 console.log('after post form')
 res.redirect('/');  // redirect to user form page after inserting the data -->홈으로
}); 

router.post('/reserve', (req, res, next) => {
  param = [req.body.date, req.body.room, req.body.seat];
  // console.log(req.body.id, req.body.pwd)
  db.query(`SELECT * FROM seats WHERE (date='${param[0]}' && room='${param[1]})`, (err, row) => {
    
    if(err) {
      console.log(req.body.seat, row[0].userPwd, 'row =', row);
      console.log(param[0]);
      console.log(err);
      // continue;
    }
    if(row.length > 0) {
      console.log(row);
      bcrypt.compare(param[1], row[0].userPwd,(error, result) =>{
        if(result){
          console.log('로그인 성공');
          // res.redirect('/login')
          // res.redirect(history.back())
          // res.send('<script>alert("로그인 성공");</scriptype=>');
        }else{
          // res.write('<script type="text/javascript">alert("로그인 실패");location.href="/#";</script>');
          console.log('로그인 실패')
          // res.redirect(history.back())
          // res.redirect('/loginfail')
        }
      })
    } else{
      // res.send('<script type="text/javascript">alert("ID가 존재하지 않습니다.");</script>');
      console.log('해당 정보가 없습니다.')
      // res.redirect(history.back())
      // res.send('<script>alert("ID 없음");</scriptype=>');
    }
  })
  res.redirect('/#'); //로그인시도후 redirect url
});


module.exports = router; // 모듈로 만드는 부분



// 회원가입 data post
var db = require('./database');

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
    
    if(err) {
      console.log(req.body.pwd, row[0].userPwd, 'row =', row);
      console.log(param[0]);
      console.log(err);
      // continue;
    }
    if(row.length > 0) {
      console.log(row);
      bcrypt.compare(param[1], row[0].userPwd,(error, result) =>{
        if(result){
          console.log('로그인 성공');
          // res.redirect('/login')
          // res.redirect(history.back())
          // res.send('<script>alert("로그인 성공");</scriptype=>');
        }else{
          // res.write('<script type="text/javascript">alert("로그인 실패");location.href="/#";</script>');
          console.log('로그인 실패')
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
  res.redirect('/#'); //로그인시도후 redirect url
});


module.exports = router; // 모듈로 만드는 부분