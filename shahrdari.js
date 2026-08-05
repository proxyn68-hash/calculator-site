let technical = 727000, finalAmount = 0;

function selectFixed() {
    technical = 727000;
    customTechnical.disabled = true;
    fixedCard.classList.add('active');
    customCard.classList.remove('active');
}

function selectCustom() {
    technical = 0;
    customTechnical.disabled = false;
    customCard.classList.add('active');
    fixedCard.classList.remove('active');
}

function calculate() {
    let outside = Number(document.getElementById('outside').value);
    let fr = Number(document.getElementById('franchise').value);
    let c = Number(document.getElementById('customTechnical').value);

    if (!customTechnical.disabled) {
        technical = c;
    }

    finalAmount = Math.floor(outside * 0.7 + technical + fr);

    result.innerHTML = finalAmount.toLocaleString() + ' ریال';
}

function copyResult() {
    navigator.clipboard.writeText(finalAmount.toString());
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 1500);
}
