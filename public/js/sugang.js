
console.log(g);
let ref = document.location.href.split('/');
let tmp = ref.pop();

if (tmp=="sisul.html") document.getElementById("nav0").style.backgroundColor = 'rgb(82, 184, 224)';
else if (tmp=="sugang.html") document.getElementById("nav1").style.backgroundColor = 'rgb(82, 184, 224)';

function pushSi(e) {

        var result = (e.innerHTML==="수강신청") ? confirm("수강신청 하시겠습니까?") : confirm("수강신청을 취소하시겠습니까?")
        if(result){
            if (e.innerHTML==="수강신청") {
                e.style.backgroundColor = "red";
                e.innerHTML = "신청취소";
            }

            else {
                e.style.backgroundColor = "green";
                e.innerHTML = "수강신청";
            }
        }
    }