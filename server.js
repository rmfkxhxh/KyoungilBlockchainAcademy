const route = require('./route.js');
const express = require('express');
const app = express();


app.use('/', route);
app.use(express.static(__dirname));
// app.use(express.static());
app.use((req, res, next) => { // 404 처리 부분
  res.status(404).send('일치하는 주소가 없습니다!');
});
app.use((err, req, res, next) => { // 에러 처리 부분
  console.error(err.stack); // 에러 메시지 표시
  res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
});

var port = 5500
console.log('server.js listening at port', port)
app.listen(port);

