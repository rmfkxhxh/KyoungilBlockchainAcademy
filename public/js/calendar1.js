// const { create } = require("yallist");

let date = new Date();

const renderCalender = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

    // year-month 채우기
  document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;

    // 지난 달 마지막 Date, 이번 달 마지막 Date
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

    // Dates 기본 배열들
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

    // prevDates 계산
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

    // nextDates 계산
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  // Dates 합치기
  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);
  console.log(dates);
  console.log(firstDateIndex);
  console.log(lastDateIndex);
  // Dates 정리
  dates.forEach((date, i) => {
          //   투명도 지정
    const condition = i >= firstDateIndex && i < lastDateIndex + 1
        //   투명도 condition = i 대입 >=  first 면 투명
        //  투명도 i<lastdate 보다 작으면 투명
                      ? 'this'
                      : 'other';
    dates[i] = `<div class="date" onclick="checkDate(${'this'})" name=${date}><span class="${condition}">${date}</span></div>`;
  });

    // Dates 그리기
  document.querySelector('.dates').innerHTML = dates.join('');

  const today = new Date();
  //   1. 뉴 데이트를 통해 오늘 날짜가 맞는 데이트 객채를 만들어주기
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    //   2. viewMonth와 viewYear가 today의 데이터와 같은지 비교를 한 다음
    for (let date of document.querySelectorAll('.this')) {
    // 3.this라는 클래스를 가진 태그들을 모두 찾아 반목문 돌려준다
      if (+date.innerText === today.getDate()) {
        //   4. +단항 연산자를 통해 숫자로 변경한 뒤 오늘 날짜와 비교
        date.classList.add('today');
        break;
      }
    }
  }
};

renderCalender();

//저번달
const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
// 이전 달이므로 -1하자
  renderCalender();
//실행 코드
};

//다음달 
const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalender();
};

//지금 현재시간
const goToday = () => {
  // =() => 은 this 를 의미한다
  date = new Date();
  renderCalender();
};

let todayDate = new Date().getDate();
let todayMonth = new Date().getMonth() + 1;
let todayYear = new Date().getFullYear();
console.log(todayDate, todayMonth, todayYear);

function checkDate(e){
    let checkDate = e.innerHTML;
    let tmp;
    //console.log(checkDate);
    //console.log(document.querySelector('.year-month').textContent);  
    if (checkDate.includes('other')) {
        e.value = 0;}
    else {
        tmp = Number(checkDate.split("</")[0].split('>')[1]);
        //console.log(tmp);
        // console.log(typeof(tmp));
        e.value = tmp;
    }

    let checkYear = Number(document.querySelector('.year-month').textContent.split('년')[0]);
    let checkMonth = Number(document.querySelector('.year-month').textContent.split('년 ')[1].split('월')[0]);
    //console.log(checkMonth);

    if (checkYear == todayYear) {
        if (todayMonth > checkMonth) alert("예약이 불가능합니다.");
        else if (todayMonth == checkMonth && todayDate > tmp) alert("예약이 불가능합니다.");
        else if (todayMonth == checkMonth && todayDate+7 > tmp) {
          visible();
          createSeat();
          // getDB(checkYear, checkMonth, tmp)
          //console.log(pickOccupiedSeat());
        } 
        else if (todayMonth+1 == checkMonth && todayDate+7-new Date(checkYear,checkMonth+1,checkDate).getDay()-1 > tmp) {
          visible();
          createSeat();
          // getDB(checkYear, checkMonth, tmp);
          //console.log(pickOccupiedSeat());
        }
        else alert("예약은 1주까지 가능합니다.")
    }
    else alert("예약 가능한 날짜가 아닙니다.");

    function visible(){
        document.getElementById("movieg").style.display = "block";
        document.getElementById("movieg").style.backgroundColor = "black";
    }
    
    // let checkDate = document.getElementsByClassName("date");
    // let tmp = checkDate[0].innerHTML;
    // console.log(tmp.split(' '));
    // console.log(checkDate[0].innerHTML);
    // console.log(typeof(checkDate[0].innerHTML));
    // console.log(tmp)
}

// const open1 =  getDate()
// for (i = 0 ; i <= get.date() ; i++){
//   window.open('좌석3.html')
// }


// function open1() {
//   for (let i = 0;  i >= get.date() ; i++)
//   window.open('좌석3.html');
// }

const container = document.querySelector(' .container');
const seats = document.querySelectorAll(' .row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// populateUI();
// let ticketPrice = +movieSelect.value;

// Save selected movie index and price
// function setMovieData(movieIndex, moviePrice) {
//   localStorage.setItem('selectedMovieIndex', movieIndex);
//   localStorage.setItem('selectedMoviePrice', moviePrice);
// }

// // update total and count

//Occupied seats의 index를 가지고 오는 함수
function getOccSeatsIndex() {
  const occupiedSeats = document.querySelectorAll('.row .seat.occupied');
  console.log(occupiedSeats);
  const occSeatsIndex = [...occupiedSeats].map((seat) => [...seats].indexOf(seat));
  // localStorage.setItem('occupiedSeats', JSON.stringify(occSeatsIndex));
  console.log("Occupied seat index: " + occSeatsIndex);
  //occSeatsIndex: occupied 좌석의 인덱스를 담은 배열
  return occSeatsIndex;
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  //console.log(selectedSeats);
    //얼마나 선택했는지 ?
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  console.log("seatsindex: " + seatsIndex);
 
//   //copy selected seats into arr
//   // map through array
//   //return new array of indexes

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
//  total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  console.log(selectedSeats);
  const occupiedSeats = JSON.parse(localStorage.getItem)
//   json로 바꿧음으로 다시 바꿔줘야한다
  if (selectedSeats !== null && selectedSeats.length > 0) {
      //선택된 시드 도트 길이 0보다 큰지?
    seats.forEach((seat, index) => {
        // 각 시드의 인덱스 내부의 오류함수 조건을 하나더
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
    console.log("populateUI");
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

//   if (selectedMovieIndex !== null) {
//     movieSelect.selectedIndex = selectedMovieIndex;
//   }
}

// Movie select event 얼마나 좌석을 선택했는지? 얼마나 가격을 질불해야하는지?
// movieSelect.addEventListener('change', (e) => {
//   ticketPrice = +e.target.value;
//   setMovieData(e.target.selectedIndex, e.target.value);
//   updateSelectedCount();
// });

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// intial count and total
// updateSelectedCount();

//submit 눌렀을 때 실행
function checkSeat(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length == 1) {
    var tmp = confirm("정말로 예약하시겠습니까?");
    if (tmp == true) {
      console.log(selectedSeats[0]);
      //selectedSeats[0]
      alert("예약되었습니다.");
      //db에 정보 전송 후 업데이트
      document.location.href = "./calendar3.html";
    }
  }

  else if (selectedSeats.length == 0) {
    alert("좌석을 선택해주세요.");
  }

  else {alert("하나의 좌석만 예약할 수 있습니다..")};
}

//24개의 자리 중 랜덤하게 occupied seats를 생성하고 배열로 리턴
function pickOccupiedSeat(){
  let occNumArr = [];
  for (let i = 0; i < 24; i++){
    let tmp = Math.floor(Math.random()*2);
    occNumArr.push(tmp)
  }
  return occNumArr;
}

//Movie option의 value값을 리턴
function getOptionValue() {
  let s = document.getElementById("movie");
  let selectOptionValue = s.options[s.selectedIndex].value;
  console.log("Value: " + selectOptionValue);
  return selectOptionValue;
}

console.log(document.querySelectorAll('.row'));


function getDB(Y,M,D) {
  let yearMonthDay = [Y, M, D];
  let optionVal = getOptionValue();
  let occupiedIndex = getOccSeatsIndex();

  console.log(yearMonthDay);
  console.log(optionVal);
  console.log(occupiedIndex);

  //db에서 가져온 정보가 null일 경우
  createSeat();
  getOccSeatsIndex(); //현재 OccSeat의 결과 

}

function createSeat() {
  let occupiedSeatIndex = pickOccupiedSeat(); //길이 24의 배열 -> 1: occupied, 0: n/a
  console.log(occupiedSeatIndex);

  occupiedSeatIndex.forEach((val, index) => {
    let tmp = (val==0) ? "seat": "seat occupied"
    occupiedSeatIndex[index] = `<div class='${tmp}'></div>`;
  });

  // console.log(occupiedSeatIndex);
  let k = 0;

  for (let i=0; i<6; i++) {
    let str = "row" + i;
    // console.log(str);
    let divClassRow = document.getElementById(str);
    // console.log(divClassRow);

    let arr = new Array();
    for (let j=0; j<4; j++){
      arr[j] = `${occupiedSeatIndex[k++]}`;
    }
    arr[3] += `</div>`;
    divClassRow.innerHTML = arr.join("");
      
  }
  // console.log(document.getElementsByClassName("row"));
}
console.log(getOccSeatsIndex());
  
  // console.log(divClassRow);

  // let k = 0;
  // divClassRow.forEach((val, index) => {
  //   for (let j=0; j<4; j++){
  //     if (j == 0) {
  //       divClassRow[index] = `<div class="row>${occupiedSeatIndex[k++]}`;
  //     }
  //     else {
  //       divClassRow[index] += `${occupiedSeatIndex[k++]}`;
  //     }
  //   }
  //   divClassRow[index] += `</div>`;
  //   val.innerHTML = divClassRow[index];
  // })
  // console.log(document.getElementsByClassName("row"));
  

  // document.querySelector('.dates').innerHTML = dates.join('');
  
  // dates.forEach((date, i) => {
  //   dates[i] = `<div class="date" onclick="checkDate(${'this'})" name=${date}><span class="${condition}">${date}</span></div>`;
  // });

  


  //null이 아닐 경우
