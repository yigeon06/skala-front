/* script/bag.js */
function showMyBag() {
    let numItems = Math.floor(Math.random() * 5) + 1;
    let bagItems = ["지갑", "휴대폰", "열쇠", "이어폰", "노트북", "충전기", "물병", "노트", "볼펜", "우산"];
    let itemsPool = [...bagItems];

    let myBag = [];

    for (let i = 0; i < numItems && itemsPool.length > 0; i++) {
        let randomIndex = Math.floor(Math.random() * itemsPool.length);
        let itemName = itemsPool.splice(randomIndex, 1)[0];
        let itemQty = Math.floor(Math.random() * 3) + 1;

        myBag.push({ name: itemName, qty: itemQty });
    }

    let resultText = "🎒 내 가방 속 물품 목록 🎒\n";
    resultText += "-----------------------------\n";

    for (let i = 0; i < myBag.length; i++) {
        resultText += `• ${myBag[i].name} : ${myBag[i].qty}개\n`;
    }

    resultText += "-----------------------------\n";
    resultText += `총 물품 종류: ${numItems}가지`;

    alert(resultText);
}