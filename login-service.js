// 회원가입 data post
var pool = require('./database');
const bcrypt = require('bcrypt-nodejs');

// 로그인 서비스 
exports.SignIn = async function(req){ 
    var json = {}; 
    json.code = 0; 
    var conn = pool.getConnection();
    var userid = req.body.userId;
    var password = req.body.userPwd;
    var query = "SELECT userId, userPwd, userName, userMail FROM users where userId='" + userid +"' ;"; 
    var rows = await conn.query(query);
    console.log('DB 쿼리') 
        if(rows[0]) { 
            //저장된 password 와 hash password 가 같은지를 체크하여 로그은 성공, 실패 처리 
            console.log('비밀번호 확인') 
            return new Promise((resolve, reject) =>{
                bcrypt.compare(password, rows[0].userPwd,(error, result) =>{ 
                    if(result) {                        
                        json.data = rows[0];
                        
                    } else 
                    { 
                        json.code = 100; 
                        json.msg = "패스워드 일치하지 않습니다.(운영환경 : ID 및 비밀번호가 일치하지 않습니다)"; 
                        json.data = {};  
                    } 
                    resolve(json); 
                }); 
            }); 
        } else 
        { 
            json.code = 100; 
            json.msg = "ID 일치하지 않습니다."; 
            json.data = {}; 
            return json; 
        };
    };
    //
    // db.query(`SELECT * FROM users WHERE userId='${param[0]}'`, (err, row) => {
      
        //       if(err) {
        //         // console.log(req.body.pwd, row[0].userPwd, 'row =', row);
        //         console.log(param[0]);
        //         console.log(err);
        //         // continue;
        //       }
        //       if(row.length > 0) {
        //         console.log(row);
        //         bcrypt.compare(param[1], row[0].userPwd,(error, result) =>{
        //           if(result){
        //             var userData = req.session.loginData;
        //             req.session.save(error => {if(error) console.log(error)})
        //             // res.json({message: 'success'})
        //             console.log('로그인 성공');
        //             // res.redirect('/login')
        //             // res.redirect(history.back())
        //             // res.send('<script>alert("로그인 성공");</scriptype=>');
        //           }else{
        //             // res.write('<script type="text/javascript">alert("로그인 실패");location.href="/#";</script>');
        //             console.log('로그인 실패')
        //             // res.json({message: 'fail'})
        //             // res.redirect(history.back())
        //             // res.redirect('/loginfail')
        //           }
        //         })
        //       } else{
        //         // res.send('<script type="text/javascript">alert("ID가 존재하지 않습니다.");</script>');
        //         console.log('ID가 존재하지 않습니다.')
        //         // res.redirect(history.back())
        //         // res.send('<script>alert("ID 없음");</scriptype=>');
        //       }
        //     })
        //     res.redirect('/'); //로그인시도후 redirect url
        //   });
    
    // 쿼리 실행 
    
// 회원가입 
exports.SignUp = async function(req,res){ 
    var resultcode = 0; 
    var conn = pool.getConnection();
    var userid = req.body.userId; 
    var password = req.body.userPwd;
    var name = req.body.userName;
    var mail = req.body.userMail;  
    var query = "SELECT userid, password, name, salt FROM member where userid='" + userid +"';"; 
    var rows = await conn.query(query); // 쿼리 실행 
    if(rows[0] == undefined) {
        bcrypt.hash(password, null, null, function(err, hash) {  
            var query = " insert into member (userid, password, name, salt, date) values ('','" + userid +"','" + password +"','" + name +"', '"+ mail +"', CURRENT_TIMESTAMP());"; 
            var rows = conn.query(query); // 쿼리 실행 
        }); 
    } else 
    { // 이미 있음 
        resultcode = 100; 
    } 
    return resultcode; 
};
