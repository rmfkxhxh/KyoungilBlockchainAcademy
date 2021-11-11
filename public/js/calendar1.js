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
    console.log(checkDate);
    console.log(document.querySelector('.year-month').textContent);  
    if (checkDate.includes('other')) {
        e.value = 0;}
    else {
        tmp = checkDate.split("</")[0].split('>')[1];
        console.log(tmp);
        // console.log(typeof(tmp));
        e.value = tmp;
    }

    let checkYear = Number(document.querySelector('.year-month').textContent.split('년')[0]);
    let checkMonth = Number(document.querySelector('.year-month').textContent.split('년 ')[1].split('월')[0]);
    console.log(checkMonth);

    if (checkYear<todayYear) {alert("예약이 불가능합니다.")}
    else if (checkYear == todayYear) {
        if (todayMonth > checkMonth) alert("예약이 불가능합니다.");
        else if (todayMonth == checkMonth && todayDate > tmp) alert("예약이 불가능합니다.");
        else visible();
    }
    else if (checkYear == todayYear + 1) {
        if (todayMonth<= checkMonth) alert("예약은 1년까지 가능합니다.");
        else visible();
    }
    else alert("예약은 1년까지 가능합니다.");

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