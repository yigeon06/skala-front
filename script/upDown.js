/* script/upDown.js */

function startGame() {
    console.log("Up-Down 게임이 성공적으로 시작되었습니다!");

    let computerNum = Math.floor(Math.random() * 50) + 1;
    let count = 0;
    let userNum;

    while(true){
        let userInput = prompt("1부터 50 사이의 숫자를 입력하세요:");
        if(userInput === null) {
            alert("게임이 종료되었습니다.");
            break;
        }

        userNum = parseInt(userInput, 10);
        if(userNum < 1 || userNum > 50 || isNaN(userNum)) {
            alert("1부터 50 사이의 유효한 숫자를 입력하세요.");
            continue;
        }

        count++;    

        if(userNum < computerNum){
            alert("Up! 더 큰 숫자를 입력하세요.");
        } else if(userNum > computerNum){
            alert("Down! 더 작은 숫자를 입력하세요.");
        } else {
            alert("축하합니다! 🎉 " + count + "번 만에 맞추셨습니다.")
            break;
        }
    }
}
