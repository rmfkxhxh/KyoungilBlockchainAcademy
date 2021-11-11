const express = require('express');
const path = require('path');
const router = express.Router()

router.get('/', (req, res) => { // app 대신 router에 연결
  res.sendFile(path.join(__dirname, 'html', 'homepage.html'));
});

router.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'member.html'));
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




module.exports = router; // 모듈로 만드는 부분