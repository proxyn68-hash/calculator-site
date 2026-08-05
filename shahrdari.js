let technical = 727000;
let finalAmount = 0;

function formatNumberInput(input) {
    input.addEventListener('blur', function () {
        let value = this.value.replace(/,/g, '').trim();

        if (value !== '' && !isNaN(value)) {
            this.value = Number(value).toLocaleString('en-US');
        }
    });
}

formatNumberInput(outside);
formatNumberInput(franchise);
formatNumberInput(customTechnical);


function getNumber(value) {
    return Number(String(value).replace(/,/g, '')) || 0;
}


// حرکت با Enter بین فیلدها
const inputs = [outside, franchise, customTechnical];

inputs.forEach((input, index) => {
    input.addEventListener('keydown', function (e) {

        if (e.key === 'Enter') {
            e.preventDefault();

            for (let i = index + 1; i < inputs.length; i++) {

                if (!inputs[i].disabled) {
                    inputs[i].focus();
                    return;
                }

            }

            calculate();
        }

    });
});


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


    finalAmount = Math.floor(
        outsideValue * 0.7 +
        technical +
        fr
    );


    result.innerHTML =
        finalAmount.toLocaleString('en-US') + ' ریال';

}


function copyResult() {

    navigator.clipboard.writeText(finalAmount.toString());

    toast.classList.add('show');


    setTimeout(() => {

        toast.classList.remove('show');

    }, 1500);

}
