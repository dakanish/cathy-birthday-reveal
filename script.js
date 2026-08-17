function switchScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
        screen.classList.remove('active');
    });
    const target = document.getElementById(screenId);
    target.classList.remove('hidden');
    target.classList.add('active');
}

function checkStage1() {
    const inputs = document.querySelectorAll('.p1-q');
    let answersCorrect = true;
    inputs.forEach(input => {
        if (input.value.trim().toUpperCase() !== input.getAttribute('data-ans')) {
            answersCorrect = false;
        }
    });

    const secretWord = document.getElementById('p1-word-input').value.trim().toUpperCase();

    if (answersCorrect && secretWord === 'HOLIDAY') {
        document.getElementById('p1-error').classList.add('hidden');
        switchScreen('screen-puzzle-2');
    } else {
        document.getElementById('p1-error').classList.remove('hidden');
    }
}

function checkStage2() {
    const inputs = document.querySelectorAll('.p2-q');
    let answersCorrect = true;
    inputs.forEach(input => {
        if (input.value.trim().toUpperCase() !== input.getAttribute('data-ans')) {
            answersCorrect = false;
        }
    });

    const secretWord = document.getElementById('p2-word-input').value.trim().toUpperCase();

    if (answersCorrect && secretWord === 'EGYPT') {
        document.getElementById('p2-error').classList.add('hidden');
        switchScreen('screen-puzzle-3');
    } else {
        document.getElementById('p2-error').classList.remove('hidden');
    }
}

function checkStage3() {
    const inputs = document.querySelectorAll('.p3-q');
    let answersCorrect = true;
    inputs.forEach(input => {
        if (input.value.trim().toUpperCase() !== input.getAttribute('data-ans')) {
            answersCorrect = false;
        }
    });

    const secretWord = document.getElementById('p3-word-input').value.trim().toUpperCase();

    if (answersCorrect && secretWord === 'JANUARY') {
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
