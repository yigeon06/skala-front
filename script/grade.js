function calculateGrade() {
    let subject = ["HTML", "CSS", "JavaScript"];
    let total = 0;

    for(let i = 0; i< subject.length; i++){
        let userInput = prompt(subject[i] + " 점수를 입력하세요 (0~100):");
        if(userInput === null) {
            alert("성적 계산이 취소되었습니다.");
            return;
        }

        let score = parseInt(userInput, 10);
        if(score < 0 || score > 100 || isNaN(score)) {
            alert("0부터 100 사이의 유효한 점수를 입력하세요.");
            i--;
            continue;
        }

        total += score;
    }

    let average = total / subject.length;
    alert(
        "===== 📊 성적 결과표 =====\n" +
        "• 총점: " + total + "점\n" +
        "• 평균: " + average.toFixed(1) + "점\n" +
        "-----------------------------\n" +
        "• 결과: " + (average >= 60 ? "합격" : "불합격")
    );  
}