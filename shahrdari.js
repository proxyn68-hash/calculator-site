let technical = 727000, finalAmount = 0;

function formatNumberInput(input) {
    input.addEventListener('blur', function () {
        let value = this.value.replace(/,/g, '');

        if (value) {
            this.value = Number(value).toLocaleString('en-US');
        }
    });

    input.addEventListener('focus', function () {
        this.value = this.value.replace(/,/g, '');
    });
}

formatNumberInput(outside);
formatNumberInput(franchise);
formatNumberInput(customTechnical);

function getNumber(value) {
    return Number(value.replace(/,/g, '')) || 0;
}

function selectFixed() {
    technical = 727000;
    customTechnical.disabled = true;
    fixedCard.classList.add('active');
    customCard.classList.remove('active');
}

function selectCustom() {
    technical = 0;
    customTechnical.disabled = false;
    customTechnical.focus();
    customCard.classList.add('active');
    fixedCard.classList.remove('active');
}

function calculate() {
    let outsideValue = getNumber(outside.value);
    let fr = getNumber(franchise.value);
    let c = getNumber(customTechnical.value);

    if (!customTechnical.disabled) {
        technical = c;
    }

    finalAmount = Math.floor(outsideValue * 0.7 + technical + fr);

    result.innerHTML = finalAmount.toLocaleString('en-US') + ' ریال';
}

function copyResult() {
    navigator.clipboard.writeText(finalAmount.toString());
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 1500);
}
