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




function formatNumberInput(input) {

    input.addEventListener("input", function () {

        let cursorPosition = this.selectionStart;

        let oldValue = this.value;

        let value = cleanNumber(oldValue);


        if (value !== "" && !isNaN(value)) {

            let formatted = Number(value).toLocaleString("en-US");

            this.value = formatted;


            let diff = formatted.length - oldValue.length;

            cursorPosition += diff;


            this.setSelectionRange(
                cursorPosition,
                cursorPosition
            );

        }

    });

}



formatNumberInput(outsideInput);
formatNumberInput(franchiseInput);
formatNumberInput(customTechnicalInput);






// ترتیب ورود اطلاعات
const inputList = [
    customTechnicalInput,
    outsideInput,
    franchiseInput
];





inputList.forEach((input, index) => {


    input.addEventListener("keydown", function(event) {


        if (event.key === "Enter") {


            event.preventDefault();



            let value = cleanNumber(this.value);



            if (value !== "" && !isNaN(value)) {

                this.value = Number(value).toLocaleString("en-US");

            }




            for (let i = index + 1; i < inputList.length; i++) {


                if (!inputList[i].disabled) {


                    inputList[i].focus();

                    inputList[i].select();

                    return;


                }

            }



            calculate();



        }


    });


});






function getNumber(value) {

    return Number(cleanNumber(value)) || 0;

}






function selectFixed() {

    technical = 727000;

    customTechnicalInput.disabled = true;

    customTechnicalInput.value = "";


    document.getElementById("fixedRadio").checked = true;

    document.getElementById("customRadio").checked = false;


    fixedCardBox.classList.add("active");

    customCardBox.classList.remove("active");


}






function selectCustom() {


    technical = 0;


    customTechnicalInput.disabled = false;



    document.getElementById("fixedRadio").checked = false;

    document.getElementById("customRadio").checked = true;



    customCardBox.classList.add("active");

    fixedCardBox.classList.remove("active");



    customTechnicalInput.focus();


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

    },1500);


}







// F2 کپی مبلغ

document.addEventListener("keydown", function(event) {


    if (event.key === "F2") {


        event.preventDefault();


        copyResult();


    }


});








// شروع صفحه با Enter
document.addEventListener("keydown", function(e){


    if(e.key === "Enter"){


        const active = document.activeElement;



        if(
            active.tagName !== "INPUT" &&
            active.tagName !== "TEXTAREA"
        ){


            e.preventDefault();


            outsideInput.focus();

            outsideInput.select();


        }


    }


});








// F4 پاک کردن فرم

document.addEventListener("keydown", function(e){


    if(e.key === "F4"){


        e.preventDefault();



        outsideInput.value = "";

        franchiseInput.value = "";

        customTechnicalInput.value = "";



        resultBox.innerHTML = "0 ریال";



        selectFixed();



        setTimeout(()=>{


            outsideInput.focus();

            outsideInput.select();


        },100);



    }


});
