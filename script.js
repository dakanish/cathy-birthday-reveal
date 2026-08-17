function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
        screen.classList.remove('active');
    });
    const target = document.getElementById(screenId);
    target.classList.remove('hidden');
    target.classList.add('active');
}

function validateRows(containerSelector) {
    const rows = document.querySelectorAll(containerSelector);
    let allValid = true;

    rows.forEach(row => {
        const expectedWord = row.getAttribute('data-answer').toUpperCase();
        const inputs = row.querySelectorAll('.letter-box');
        let typedWord = "";
        inputs.forEach(input => {
            typedWord += (input.value || "").toUpperCase();
        });

        if (typedWord !== expectedWord) {
            allValid = false;
        }
    });

    return allValid;
}

function checkStage1() {
    const rowsValid = validateRows('#screen-puzzle-1 .word-row');
    const secret = document.getElementById('stage1-secret').value.trim().toUpperCase();

    if (rowsValid && secret === 'HOLIDAY') {
        document.getElementById('p1-error').classList.add('hidden');
        switchScreen('screen-puzzle-2');
    } else {
        document.getElementById('p1-error').classList.remove('hidden');
    }
}

function checkStage2() {
    const rowsValid = validateRows('#screen-puzzle-2 .word-row');
    const secret = document.getElementById('stage2-secret').value.trim().toUpperCase();

    if (rowsValid && secret === 'EGYPT') {
        document.getElementById('p2-error').classList.add('hidden');
        switchScreen('screen-puzzle-3');
    } else {
        document.getElementById('p2-error').classList.remove('hidden');
    }
}

function checkStage3() {
    const rowsValid = validateRows('#screen-puzzle-3 .word-row');
    const secret = document.getElementById('stage3-secret').value.trim().toUpperCase();

    if (rowsValid && secret === 'JANUARY') {
        document.getElementById('p3-error').classList.add('hidden');
        switchScreen('screen-dragdrop');
    } else {
        document.getElementById('p3-error').classList.remove('hidden');
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
