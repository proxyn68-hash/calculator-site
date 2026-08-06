let technical = 727000;
let finalAmount = 0;
let isStaff = true;


const sitePercentInput = document.getElementById("sitePercent");
const outsideInput = document.getElementById("outside");
const herasiInput = document.getElementById("herasi");
const customTechnicalInput = document.getElementById("customTechnical");


const resultBox = document.getElementById("result");
const toastBox = document.getElementById("toast");


const fixedCardBox = document.getElementById("fixedCard");
const customCardBox = document.getElementById("customCard");


const staffCardBox = document.getElementById("staffCard");
const otherCardBox = document.getElementById("otherCard");



function cleanNumber(value){
    return String(value).replace(/,/g,'');
}



function formatNumberInput(input){

    input.addEventListener("input",function(){

        let cursorPosition=this.selectionStart;
        let oldValue=this.value;

        let value=cleanNumber(oldValue);


        if(value!=="" && !isNaN(value)){

            let formatted =
            Number(value).toLocaleString("en-US");


            this.value=formatted;


            let diff =
            formatted.length-oldValue.length;


            cursorPosition += diff;


            this.setSelectionRange(
                cursorPosition,
                cursorPosition
            );

        }

    });

}



formatNumberInput(customTechnicalInput);
formatNumberInput(outsideInput);
formatNumberInput(herasiInput);




function getNumber(value){

    return Number(cleanNumber(value)) || 0;

}




function selectStaff(){

    isStaff=true;


    document.getElementById("staffRadio").checked=true;
    document.getElementById("otherRadio").checked=false;


    staffCardBox.classList.add("active");
    otherCardBox.classList.remove("active");


    document.getElementById("technicalSection").style.display="block";

}




function selectOther(){

    isStaff=false;


    document.getElementById("staffRadio").checked=false;
    document.getElementById("otherRadio").checked=true;


    otherCardBox.classList.add("active");
    staffCardBox.classList.remove("active");


    document.getElementById("technicalSection").style.display="none";


    technical=0;

}





function selectFixed(){

    technical=727000;


    customTechnicalInput.disabled=true;
    customTechnicalInput.value="";


    document.getElementById("fixedRadio").checked=true;
    document.getElementById("customRadio").checked=false;


    fixedCardBox.classList.add("active");
    customCardBox.classList.remove("active");

}




function selectCustom(){

    technical=0;


    customTechnicalInput.disabled=false;


    document.getElementById("fixedRadio").checked=false;
    document.getElementById("customRadio").checked=true;


    customCardBox.classList.add("active");
    fixedCardBox.classList.remove("active");


    customTechnicalInput.focus();

}





function calculate(){


    let percent =
    Number(sitePercentInput.value) || 0;


    let outside =
    getNumber(outsideInput.value);


    let herasi =
    getNumber(herasiInput.value);



    let base =
    outside * ((100-percent)/100);




    if(isStaff){


        if(!customTechnicalInput.disabled){

            technical =
            getNumber(customTechnicalInput.value);

        }


        finalAmount =
        Math.floor(
            base +
            technical +
            herasi
        );


    }
    else{


        finalAmount =
        Math.floor(
            base +
            herasi
        );


    }




    resultBox.innerHTML =
    finalAmount.toLocaleString("en-US")
    +" ریال";


}





function getFields(){


    if(isStaff && !customTechnicalInput.disabled){

        return [
            customTechnicalInput,
            sitePercentInput,
            outsideInput,
            herasiInput
        ];

    }


    return [
        sitePercentInput,
        outsideInput,
        herasiInput
    ];

}





document.addEventListener("keydown",function(e){


    if(e.key==="Enter"){


        let fields=getFields();

        let index=fields.indexOf(document.activeElement);



        if(index!==-1){


            e.preventDefault();


            if(fields[index+1]){

                fields[index+1].focus();
                fields[index+1].select();

            }

            else{

                calculate();


                setTimeout(()=>{

                    resultBox.scrollIntoView({

                        behavior:"smooth",
                        block:"center"

                    });

                },100);

            }


        }

        else{


            const active=document.activeElement;


            if(
                active.tagName!=="INPUT" &&
                active.tagName!=="TEXTAREA"
            ){

                e.preventDefault();

                sitePercentInput.focus();

            }


        }


    }


});






function copyResult(){


    navigator.clipboard.writeText(
        finalAmount.toString()
    );


    toastBox.classList.add("show");


    setTimeout(()=>{

        toastBox.classList.remove("show");

    },1500);


}






document.addEventListener("keydown",function(e){


    if(e.key==="F2"){

        e.preventDefault();

        copyResult();

    }


});







document.addEventListener("keydown",function(e){


    if(e.key==="F4"){


        e.preventDefault();


        sitePercentInput.value="";
        outsideInput.value="";
        herasiInput.value="";
        customTechnicalInput.value="";


        resultBox.innerHTML="0 ریال";


        selectStaff();
        selectFixed();



        setTimeout(()=>{

            sitePercentInput.focus();
            sitePercentInput.select();

        },100);


    }


});
