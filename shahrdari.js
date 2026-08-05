let technical = 727000;
let finalAmount = 0;


const outsideInput = document.getElementById("outside");
const franchiseInput = document.getElementById("franchise");
const customTechnicalInput = document.getElementById("customTechnical");

const resultBox = document.getElementById("result");
const toastBox = document.getElementById("toast");

const fixedCardBox = document.getElementById("fixedCard");
const customCardBox = document.getElementById("customCard");



function cleanNumber(value) {
    return String(value).replace(/,/g, '');
}




// جداکننده هزارگان هنگام تایپ
function formatNumberInput(input) {

    input.addEventListener("input", function () {

        let cursorPosition = this.selectionStart;

        let oldLength = this.value.length;


        let value = cleanNumber(this.value);


        if (value !== "" && !isNaN(value)) {

            this.value = Number(value).toLocaleString("en-US");


            let newLength = this.value.length;


            cursorPosition += newLength - oldLength;


            this.setSelectionRange(
                cursorPosition,
                cursorPosition
            );

        }

    });



    input.addEventListener("focus", function () {

        this.value = cleanNumber(this.value);

    });

}



formatNumberInput(outsideInput);
formatNumberInput(franchiseInput);
formatNumberInput(customTechnicalInput);






// حرکت با Enter بین فیلدها

const inputList = [
    outsideInput,
    franchiseInput,
    customTechnicalInput
];



inputList.forEach((input, index) => {


    input.addEventListener("keydown", function(event) {


        if (event.key === "Enter") {


            event.preventDefault();


            this.value = cleanNumber(this.value);



            for (let i = index + 1; i < inputList.length; i++) {


                if (!inputList[i].disabled) {


                    inputList[i].focus();

                    return;


                }

            }



            calculate();


        }


    });


});








function getNumber(value) {

    return Number(
        cleanNumber(value)
    ) || 0;

}








function selectFixed() {


    technical = 727000;


    customTechnicalInput.disabled = true;


    fixedCardBox.classList.add("active");

    customCardBox.classList.remove("active");


}








function selectCustom() {


    technical = 0;


    customTechnicalInput.disabled = false;


    customTechnicalInput.focus();



    customCardBox.classList.add("active");

    fixedCardBox.classList.remove("active");


}









function calculate() {


    let outsideValue = getNumber(outsideInput.value);

    let franchiseValue = getNumber(franchiseInput.value);

    let customValue = getNumber(customTechnicalInput.value);




    if (!customTechnicalInput.disabled) {


        technical = customValue;


    }




    finalAmount = Math.floor(


        outsideValue * 0.7 +

        technical +

        franchiseValue


    );




    resultBox.innerHTML =

        finalAmount.toLocaleString("en-US") + " ریال";


}









function copyResult() {


    navigator.clipboard.writeText(

        finalAmount.toString()

    );



    toastBox.classList.add("show");



    setTimeout(() => {


        toastBox.classList.remove("show");


    }, 1500);



}









// کلید میانبر F2 برای کپی مبلغ

document.addEventListener("keydown", function(event) {


    if (event.key === "F2") {


        event.preventDefault();


        copyResult();


    }


});
