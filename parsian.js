let technical = 727000;

const $ = id => document.getElementById(id);


function clean(v){
    return String(v).replace(/,/g,'');
}


["outside","herasi","customTechnical"].forEach(id=>{

    $(id).addEventListener("input",e=>{

        let v = clean(e.target.value);

        if(v)
            e.target.value = Number(v).toLocaleString("en-US");

    });

});


function num(id){
    return Number(clean($(id).value)) || 0;
}



function selectFixed(){

    technical = 727000;

    $("customTechnical").disabled = true;

    $("fixedRadio").checked = true;
    $("customRadio").checked = false;

    fixedCard.classList.add("active");
    customCard.classList.remove("active");

}



function selectCustom(){

    technical = 0;

    $("customTechnical").disabled = false;

    $("fixedRadio").checked = false;
    $("customRadio").checked = true;

    customCard.classList.add("active");
    fixedCard.classList.remove("active");

    $("customTechnical").focus();

}



function calculate(){

    if(!$("customTechnical").disabled)
        technical = num("customTechnical");


    let p = Number($("sitePercent").value) || 0;

    let out = num("outside");

    let h = num("herasi");


    let res =
    (out + technical) *
    ((100-p)/100)
    + h;


    $("result").textContent =
    Math.floor(res).toLocaleString("en-US")
    +" ریال";

}




// Enter بین فیلدها

const enterFields = [

    "customTechnical",
    "sitePercent",
    "outside",
    "herasi"

];


enterFields.forEach((id,index)=>{


    const field = $(id);


    if(field){

        field.addEventListener("keydown",function(e){


            if(e.key==="Enter"){


                e.preventDefault();


                const next = enterFields[index+1];


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




// شروع با Enter روی اولین فیلد

document.addEventListener("keydown",function(e){


    if(e.key==="Enter"){


        const active=document.activeElement;


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





// F2 کپی مبلغ

document.addEventListener("keydown",function(e){


    if(e.key==="F2"){


        e.preventDefault();


        navigator.clipboard.writeText(
            $("result").textContent
        );


        alert("مبلغ کپی شد");


    }


});






// F4 پاک کردن فرم

document.addEventListener("keydown",function(e){


    if(e.key==="F4"){


        e.preventDefault();


        $("sitePercent").value="";
        $("outside").value="";
        $("herasi").value="";
        $("customTechnical").value="";


        $("result").textContent="0 ریال";


        selectFixed();


        setTimeout(()=>{

            $("sitePercent").focus();

        },100);



    }


});
