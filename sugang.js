var clickCount = 0;
function pushSi(e) {
        if(clickCount%2 == 0) {
            window.alert("수강신청하시겠습니까?");
            e.style.backgroundColor = "red"
            e.innerHTML = "신청취소"
        }
        else {
            window.alert("수강신청을 취소하시겠습니까?");
            e.style.backgroundColor = "green"
            e.innerHTML = "수강신청"
        }
        clickCount++;
}