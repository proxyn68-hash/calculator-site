let technical=727000, finalAmount=0, isStaff=true;
const sitePercentInput=document.getElementById("sitePercent"), outsideInput=document.getElementById("outside"), herasiInput=document.getElementById("herasi"), customTechnicalInput=document.getElementById("customTechnical");
const resultBox=document.getElementById("result"), toastBox=document.getElementById("toast");
const fixedCardBox=document.getElementById("fixedCard"), customCardBox=document.getElementById("customCard"), staffCardBox=document.getElementById("staffCard"), otherCardBox=document.getElementById("otherCard");

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


let ceiling=30000000;
const customCeilingInput=document.getElementById("customCeiling");
const fixedCeilingCard=document.getElementById("fixedCeilingCard");
const customCeilingCard=document.getElementById("customCeilingCard");
function selectFixedCeiling(){
    ceiling=30000000; customCeilingInput.disabled=true; customCeilingInput.value="";
    document.getElementById("fixedCeilingRadio").checked=true; document.getElementById("customCeilingRadio").checked=false;
    fixedCeilingCard.classList.add("active"); customCeilingCard.classList.remove("active");
}
function selectCustomCeiling(){
    ceiling=getNumber(customCeilingInput.value); customCeilingInput.disabled=false;
    document.getElementById("fixedCeilingRadio").checked=false; document.getElementById("customCeilingRadio").checked=true;
    customCeilingCard.classList.add("active"); fixedCeilingCard.classList.remove("active");
    customCeilingInput.focus();
}

[customCeilingInput,customTechnicalInput,outsideInput,herasiInput].forEach(formatNumberInput);
function selectStaff(){isStaff=true;staffRadio.checked=true;otherRadio.checked=false;staffCardBox.classList.add("active");otherCardBox.classList.remove("active");document.getElementById("technicalSection").style.display="block";}
function selectOther(){isStaff=false;staffRadio.checked=false;otherRadio.checked=true;otherCardBox.classList.add("active");staffCardBox.classList.remove("active");document.getElementById("technicalSection").style.display="none";technical=0;}
function selectFixed(){technical=727000;customTechnicalInput.disabled=true;customTechnicalInput.value="";fixedRadio.checked=true;customRadio.checked=false;fixedCardBox.classList.add("active");customCardBox.classList.remove("active");}
function selectCustom(){technical=0;customTechnicalInput.disabled=false;fixedRadio.checked=false;customRadio.checked=true;customCardBox.classList.add("active");fixedCardBox.classList.remove("active");customTechnicalInput.focus();}
function calculate(){
 if(!customCeilingInput.disabled) ceiling=getNumber(customCeilingInput.value);
 let p=Number(sitePercentInput.value)||0,out=getNumber(outsideInput.value),h=getNumber(herasiInput.value),base=out*((100-p)/100);
 if(isStaff){if(!customTechnicalInput.disabled)technical=getNumber(customTechnicalInput.value);finalAmount=Math.floor(base+technical+h);}
 else finalAmount=Math.floor(base+h);
 finalAmount=Math.min(finalAmount,ceiling);
 resultBox.textContent=finalAmount.toLocaleString("en-US")+" ریال";
}
function getFields(){if(isStaff&&!customTechnicalInput.disabled)return [customCeilingInput,customTechnicalInput,sitePercentInput,outsideInput,herasiInput];return [customCeilingInput,sitePercentInput,outsideInput,herasiInput];}
document.addEventListener("keydown",e=>{
 if(e.key==="Enter"){
  let fields=getFields(),i=fields.indexOf(document.activeElement);
  if(i!==-1){e.preventDefault();if(fields[i+1]){fields[i+1].focus();fields[i+1].select();}else{calculate();setTimeout(()=>resultBox.scrollIntoView({behavior:"smooth",block:"center"}),100);}}
  else if(!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();customCeilingInput.focus();customCeilingInput.select();}
 }
 if(e.key==="F2"){e.preventDefault();copyResult();}
 if(e.key==="F4"){e.preventDefault();[customCeilingInput,customTechnicalInput,sitePercentInput,outsideInput,herasiInput].forEach(x=>x.value="");resultBox.textContent="0 ریال";selectFixedCeiling();selectStaff();selectFixed();setTimeout(()=>customCeilingInput.focus(),100);}
});
function copyResult(){navigator.clipboard.writeText(finalAmount.toString());toastBox.classList.add("show");setTimeout(()=>toastBox.classList.remove("show"),1500);}
