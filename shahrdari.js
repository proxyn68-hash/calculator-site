let technical=727000, finalAmount=0;
const outsideInput=document.getElementById("outside"), franchiseInput=document.getElementById("franchise"), customTechnicalInput=document.getElementById("customTechnical");
const resultBox=document.getElementById("result"), toastBox=document.getElementById("toast");
const fixedCardBox=document.getElementById("fixedCard"), customCardBox=document.getElementById("customCard");

function cleanNumber(value){ return String(value).replace(/,/g,''); }
function getNumber(value){ return Number(cleanNumber(value)) || 0; }
function formatNumberInput(input){
    input.addEventListener("input",function(){
        let cursorPosition=this.selectionStart, oldValue=this.value, value=cleanNumber(oldValue);
        if(value!=="" && !isNaN(value)){
            let formatted=Number(value).toLocaleString("en-US");
            this.value=formatted;
            cursorPosition += formatted.length-oldValue.length;
            this.setSelectionRange(cursorPosition,cursorPosition);
        }
    });
}


let specialty="general";
let ceiling=15000000;
const fixedCeilingDefaultGeneral=15000000;
const fixedCeilingDefaultSpecialist=40000000;
const customCeilingInput=document.getElementById("customCeiling");
const fixedCeilingCard=document.getElementById("fixedCeilingCard");
const customCeilingCard=document.getElementById("customCeilingCard");
const generalCard=document.getElementById("generalSpecialtyCard");
const specialistCard=document.getElementById("specialistSpecialtyCard");
function updateFixedCeilingLabel(){
    const span=fixedCeilingCard.querySelector("span");
    span.textContent=Number(specialty==="general"?fixedCeilingDefaultGeneral:fixedCeilingDefaultSpecialist).toLocaleString("en-US")+" ریال";
}
function selectGeneral(){
    specialty="general"; document.getElementById("generalSpecialtyRadio").checked=true; document.getElementById("specialtyTypeRadio").checked=false;
    generalCard.classList.add("active"); specialistCard.classList.remove("active");
    updateFixedCeilingLabel(); selectFixedCeiling();
}
function selectSpecialist(){
    specialty="specialist"; document.getElementById("generalSpecialtyRadio").checked=false; document.getElementById("specialtyTypeRadio").checked=true;
    specialistCard.classList.add("active"); generalCard.classList.remove("active");
    updateFixedCeilingLabel(); selectFixedCeiling();
}
function selectFixedCeiling(){
    ceiling=specialty==="general"?fixedCeilingDefaultGeneral:fixedCeilingDefaultSpecialist;
    customCeilingInput.disabled=true; customCeilingInput.value="";
    document.getElementById("fixedCeilingRadio").checked=true; document.getElementById("customCeilingRadio").checked=false;
    fixedCeilingCard.classList.add("active"); customCeilingCard.classList.remove("active");
}
function selectCustomCeiling(){
    ceiling=getNumber(customCeilingInput.value);
    customCeilingInput.disabled=false;
    document.getElementById("fixedCeilingRadio").checked=false; document.getElementById("customCeilingRadio").checked=true;
    customCeilingCard.classList.add("active"); fixedCeilingCard.classList.remove("active");
    customCeilingInput.focus();
}

[customTechnicalInput,outsideInput,franchiseInput,customCeilingInput].forEach(formatNumberInput);
function selectFixed(){technical=727000;customTechnicalInput.disabled=true;customTechnicalInput.value="";fixedRadio.checked=true;customRadio.checked=false;fixedCardBox.classList.add("active");customCardBox.classList.remove("active");}
function selectCustom(){technical=0;customTechnicalInput.disabled=false;fixedRadio.checked=false;customRadio.checked=true;customCardBox.classList.add("active");fixedCardBox.classList.remove("active");customTechnicalInput.focus();}
function calculate(){
 if(!customTechnicalInput.disabled) technical=getNumber(customTechnicalInput.value);
 let outside=getNumber(outsideInput.value), franchise=getNumber(franchiseInput.value);
 let calculated=Math.floor(outside*0.7+technical+franchise);
 if(!customCeilingInput.disabled) ceiling=getNumber(customCeilingInput.value);
 finalAmount=Math.min(calculated,ceiling);
 resultBox.textContent=finalAmount.toLocaleString("en-US")+" ریال";
}
const fields=[customCeilingInput,customTechnicalInput,outsideInput,franchiseInput];
document.addEventListener("keydown",e=>{
 if(e.key==="Enter"){
  let i=fields.indexOf(document.activeElement);
  if(i!==-1){e.preventDefault(); if(fields[i+1]){fields[i+1].focus();fields[i+1].select();}else{calculate();setTimeout(()=>resultBox.scrollIntoView({behavior:"smooth",block:"center"}),100);}}
  else if(!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();outsideInput.focus();outsideInput.select();}
 }
 if(e.key==="F2"){e.preventDefault();copyResult();}
 if(e.key==="F4"){e.preventDefault();[customCeilingInput,customTechnicalInput,outsideInput,franchiseInput].forEach(x=>x.value="");resultBox.textContent="0 ریال";selectGeneral();selectFixedCeiling();selectFixed();setTimeout(()=>outsideInput.focus(),100);}
});
function copyResult(){navigator.clipboard.writeText(finalAmount.toString());toastBox.classList.add("show");setTimeout(()=>toastBox.classList.remove("show"),1500);}
