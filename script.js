function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
        screen.classList.remove('active');
    });
    const target = document.getElementById(screenId);
    target.classList.remove('hidden');
    target.classList.add('active');
}

function checkCrossword() {
    const cells = document.querySelectorAll('.cw-cell');
    let userWord = "";
    cells.forEach(cell => {
        userWord += cell.value.toLowerCase();
    });

    if (userWord === "holiday") {
        document.getElementById('cw-error').classList.add('hidden');
        switchScreen('screen-dragdrop');
    } else {
        document.getElementById('cw-error').classList.remove('hidden');
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.innerText);
}

let droppedCount = 0;

function drop(ev, expectedWord, zoneId) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const zone = document.getElementById(zoneId);
    
    if (data.toLowerCase() === expectedWord.toLowerCase() && zone.innerText.includes("___")) {
        zone.innerText = data;
        zone.style.color = "#00ffcc";
        zone.style.borderBottom = "2px solid #00ffcc";
        droppedCount++;

        if (droppedCount === 3) {
            setTimeout(() => {
                switchScreen('screen-reveal');
            }, 600);
        }
    }
}
