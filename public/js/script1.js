const container = document.querySelector(' .container');
const seats = document.querySelectorAll(' .row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


// // update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //얼마나 선택했는지 ?
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
//   json로 바꿧음으로 다시 바꿔줘야한다
  if (selectedSeats !== null && selectedSeats.length > 0) {
      //선택된 시드 도트 길이 0보다 큰지?
    seats.forEach((seat, index) => {
        // 각 시드의 인덱스 내부의 오류함수 조건을 하나더
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

}


// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

// intial count and total
// updateSelectedCount();

function checkSeat(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length == 1) {
    var tmp = confirm("정말로 예약하시겠습니까?");
    if (tmp == true) {
      alert("예약되었습니다.");
      document.location.href = "./calendar3.html";
    }
  }

  else if (selectedSeats.length == 0) {
    alert("좌석을 선택해주세요.");
  }

  else {alert("하나의 좌석만 예약할 수 있습니다..")};
}