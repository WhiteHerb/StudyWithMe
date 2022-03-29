const inputH = document.getElementById("timeH")
const inputM = document.getElementById("timeM")

function hour() {
    if(inputH.value >= 24){
        alert("시간이 24시간 이상일 수 없습니다!")
        inputH.value = 0
    }
}
function min() {
    if(inputM.value >= 24){
        alert("분이 60분 이상일 수 없습니다!")
        inputM.value = 0
    }
}

inputH.addEventListener("change",hour)
inputM.addEventListener("change",min)