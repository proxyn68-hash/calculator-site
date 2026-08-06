let technical = 727000;


const $ = id => document.getElementById(id);



function clean(v){

return String(v).replace(/,/g,'');

}



["outside","herasi","customTechnical"].forEach(id=>{


$(id).addEventListener("input",e=>{


let v=clean(e.target.value);


if(v){

e.target.value =
Number(v).toLocaleString("en-US");

}


});


});




function num(id){

return Number(clean($(id).value)) || 0;

}





function selectFixed(){


technical=727000;


$("customTechnical").disabled=true;


$("fixedRadio").checked=true;

$("customRadio").checked=false;


fixedCard.classList.add("active");

customCard.classList.remove("active");


}




function selectCustom(){


technical=0;


$("customTechnical").disabled=false;


$("fixedRadio").checked=false;

$("customRadio").checked=true;



customCard.classList.add("active");

fixedCard.classList.remove("active");



$("customTechnical").focus();



}






function calculate(){



if(!$("customTechnical").disabled)

technical=num("customTechnical");



let percent =
Number($("sitePercent").value) || 0;



let outside =
num("outside");



let herasi =
num("herasi");



let result =
(outside + technical) *
((100-percent)/100)
+ herasi;



$("result").textContent =
Math.floor(result).toLocaleString("en-US")
+" ریال";



}







// حرکت با Enter

const fields=[

"customTechnical",

"sitePercent",

"outside",

"herasi"

];



fields.forEach((id,index)=>{


let field=$(id);


if(field){


field.addEventListener("keydown",e=>{


if(e.key==="Enter"){


e.preventDefault();



let next=fields[index+1];



if(next){


$(next).focus();

$(next).select();


}

else{


calculate();



setTimeout(()=>{


$("result").scrollIntoView({

behavior:"smooth",

block:"center"

});


},100);



}


}


});


}


});







// شروع با Enter

document.addEventListener("keydown",e=>{


if(e.key==="Enter"){


let active=document.activeElement;



if(
active.tagName!=="INPUT" &&
active.tagName!=="TEXTAREA"
){


e.preventDefault();


$("sitePercent").focus();

$("sitePercent").select();


}


}


});







// کپی مبلغ

function copyResult(){


navigator.clipboard.writeText(
$("result").textContent
);


showToast("مبلغ کپی شد");


}






document.addEventListener("keydown",e=>{


if(e.key==="F2"){


e.preventDefault();


copyResult();


}


});







// پاک کردن فرم F4

document.addEventListener("keydown",e=>{


if(e.key==="F4"){


e.preventDefault();



$("sitePercent").value="";

$("outside").value="";

$("herasi").value="";

$("customTechnical").value="";



$("result").textContent="0 ریال";



selectFixed();



$("sitePercent").focus();



}


});







function showToast(text){



let toast=document.createElement("div");


toast.className="toast-message";


toast.innerText=text;



document.body.appendChild(toast);



setTimeout(()=>{

toast.classList.add("show");

},10);



setTimeout(()=>{


toast.classList.remove("show");


setTimeout(()=>{

toast.remove();

},300);



},2000);



}
