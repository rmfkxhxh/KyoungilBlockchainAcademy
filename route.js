const express = require('express');
const path = require('path');
const router = express.Router()

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


// router.get('/registration', (req, res) => {
//   res.sendFile(path.join(__dirname, 'html', 'member.html'));
// });


//회원가입 data post
var db = require('./database');
console.log('get member.html')
app.get('/registration', function(req, res) {
  res.render(path.join(__dirname, 'html', 'member.html'));
})
console.log('render member.html')
app.post('/form', urlencodedParser, function(req, res, next) {
  console.log('post form')
  
  // store all the user input data
  const userDetails=req.body;
  console.log(userDetails)
 
  // insert user data into users table

  var sql = "INSERT INTO `users` (`idNumber`, `userId`, `userPwd`, `userName`, `userMail`) VALUES (NUll, 'userID', 'userPwd', 'userName', 'userMail')";
  // <!-- userId, userPwd, userName, userMail  -->
  db.query(sql, req.body, function (err, data) { 
      if (err) throw err;
         console.log("User data is inserted successfully "); 
  });
  console.log('after post form')
  res.redirect('/');  // redirect to user form page after inserting the data -->홈으로
}); 



module.exports = router; // 모듈로 만드는 부분

// app.post('/submit', urlencodedParser, function (req, res) {
//     console.log("Im here");
//     console.log(req.body.name);
//     console.log(req.body.message);
//     connection.connect(function (err) {
//         if (err) throw err;
//         console.log("connected");
//         var sql = "INSERT INTO `users` (`name`,`message`) VALUES ('" + req.body.name + "', '" + req.body.message + "')";
//         connection.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log("table created");
//         });
//     });
//     res.sendFile('public/index.html', { root: __dirname });
// });


// app.listen(3000, function () {
//     console.log('Listening on port 3000');
// });