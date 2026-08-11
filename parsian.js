let technical = 727000;

let finalAmount = 0;

let ceilingMode = "fixed";

let specialty = "general";

let selectedLimit = 20000000;

const sitePercentInput =
document.getElementById("sitePercent");

const outsideInput =
document.getElementById("outside");

const herasiInput =
document.getElementById("herasi");

const customTechnicalInput =
document.getElementById("customTechnical");

const customCeilingInput =
document.getElementById("customCeiling");

const resultBox =
document.getElementById("result");

const toastBox =
document.getElementById("toast");

function cleanNumber(value) {

```
return String(value ?? "")
    .replace(/,/g, "");
```

}

function getNumber(value) {

```
return Number(cleanNumber(value)) || 0;
```

}

function formatNumberInput(input) {

```
input.addEventListener("input", function () {

    let oldValue = this.value;

    let cursorPosition =
        this.selectionStart || 0;

    let value =
        cleanNumber(oldValue);


    if (
        value !== "" &&
        !isNaN(value)
    ) {

        let formatted =
            Number(value).toLocaleString("en-US");


        this.value = formatted;


        cursorPosition +=
            formatted.length -
            oldValue.length;


        this.setSelectionRange(
            cursorPosition,
            cursorPosition
        );

    }

});
```

}

[
customCeilingInput,
customTechnicalInput,
outsideInput,
herasiInput

].forEach(formatNumberInput);

function selectGeneral() {

```
specialty = "general";

selectedLimit = 20000000;


document.getElementById("generalRadio").checked = true;

document.getElementById("specialistRadio").checked = false;


document
    .getElementById("generalCard")
    .classList.add("active");


document
    .getElementById("specialistCard")
    .classList.remove("active");


if (ceilingMode === "fixed") {

    document.getElementById(
        "fixedCeilingText"
    ).textContent =
        "20,000,000 ریال";

}
```

}

function selectSpecialist() {

```
specialty = "specialist";

selectedLimit = 50000000;


document.getElementById("generalRadio").checked = false;

document.getElementById("specialistRadio").checked = true;


document
    .getElementById("specialistCard")
    .classList.add("active");


document
    .getElementById("generalCard")
    .classList.remove("active");


if (ceilingMode === "fixed") {

    document.getElementById(
        "fixedCeilingText"
    ).textContent =
        "50,000,000 ریال";

}
```

}

function selectFixedCeiling() {

```
ceilingMode = "fixed";


selectedLimit =
    specialty === "specialist"
        ? 50000000
        : 20000000;


customCeilingInput.disabled = true;

customCeilingInput.value = "";


document.getElementById(
    "fixedCeilingRadio"
).checked = true;


document.getElementById(
    "customCeilingRadio"
).checked = false;


document
    .getElementById("fixedCeilingCard")
    .classList.add("active");


document
    .getElementById("customCeilingCard")
    .classList.remove("active");


document.getElementById(
    "fixedCeilingText"
).textContent =
    selectedLimit.toLocaleString("en-US")
    + " ریال";
```

}

function selectCustomCeiling() {

```
ceilingMode = "custom";


customCeilingInput.disabled = false;


document.getElementById(
    "fixedCeilingRadio"
).checked = false;


document.getElementById(
    "customCeilingRadio"
).checked = true;


document
    .getElementById("customCeilingCard")
    .classList.add("active");


document
    .getElementById("fixedCeilingCard")
    .classList.remove("active");


customCeilingInput.focus();

customCeilingInput.select();
```

}

function selectFixed() {

```
technical = 727000;


customTechnicalInput.disabled = true;

customTechnicalInput.value = "";


document.getElementById(
    "fixedRadio"
).checked = true;


document.getElementById(
    "customRadio"
).checked = false;


document
    .getElementById("fixedCard")
    .classList.add("active");


document
    .getElementById("customCard")
    .classList.remove("active");
```

}

function selectCustom() {

```
technical = 0;


customTechnicalInput.disabled = false;


document.getElementById(
    "fixedRadio"
).checked = false;


document.getElementById(
    "customRadio"
).checked = true;


document
    .getElementById("customCard")
    .classList.add("active");


document
    .getElementById("fixedCard")
    .classList.remove("active");


customTechnicalInput.focus();

customTechnicalInput.select();
```

}

function calculate() {

```
const percent =
    Number(sitePercentInput.value) || 0;


const outside =
    getNumber(outsideInput.value);


const herasi =
    getNumber(herasiInput.value);


const technicalValue =
    customTechnicalInput.disabled
        ? technical
        : getNumber(customTechnicalInput.value);



const calculatedAmount =
    Math.floor(
        (outside + technicalValue) *
        ((100 - percent) / 100) +
        herasi
    );



const limit =
    ceilingMode === "custom"
        ? getNumber(customCeilingInput.value)
        : selectedLimit;



finalAmount =
    Math.min(
        calculatedAmount,
        limit
    );



resultBox.textContent =
    finalAmount.toLocaleString("en-US")
    + " ریال";
```

}

function getFields() {

```
const fields = [];


// اگر سقف تعهد دلخواه باشد
if (!customCeilingInput.disabled) {

    fields.push(
        customCeilingInput
    );

}


// اگر حق فنی دلخواه باشد
if (!customTechnicalInput.disabled) {

    fields.push(
        customTechnicalInput
    );

}


// فیلدهای اصلی
fields.push(
    sitePercentInput,
    outsideInput,
    herasiInput
);


return fields;
```

}

// مدیریت Enter

document.addEventListener(
"keydown",
function (event) {

```
    if (event.key !== "Enter") {
        return;
    }


    event.preventDefault();


    const active =
        document.activeElement;


    const fields =
        getFields();


    const index =
        fields.indexOf(active);



    // اگر کاربر داخل یکی از فیلدها باشد

    if (index !== -1) {


        // رفتن به فیلد بعدی

        if (fields[index + 1]) {

            fields[index + 1].focus();

            fields[index + 1].select();

        }


        // اگر آخرین فیلد بود

        else {

            calculate();


            setTimeout(() => {

                resultBox.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            }, 100);

        }


        return;

    }



    // اگر صفحه تازه باز شده باشد
    // یا فوکوس روی هیچ فیلدی نباشد

    const firstField =
        fields.find(function (input) {

            return (
                input &&
                !input.disabled &&
                input.offsetParent !== null
            );

        });



    if (firstField) {

        firstField.focus();

        firstField.select();

    }

}
```

);

// F2 = کپی مبلغ

function copyResult() {

```
navigator.clipboard.writeText(
    finalAmount.toString()
);


toastBox.classList.add("show");


setTimeout(() => {

    toastBox.classList.remove("show");

}, 1500);
```

}

// F2 / F4 / F8

document.addEventListener(
"keydown",
function (event) {

```
    // F2 = کپی مبلغ

    if (event.key === "F2") {

        event.preventDefault();

        copyResult();

    }



    // F4 = پاک کردن فرم

    if (event.key === "F4") {

        event.preventDefault();


        customCeilingInput.value = "";

        customTechnicalInput.value = "";

        sitePercentInput.value = "";

        outsideInput.value = "";

        herasiInput.value = "";


        resultBox.textContent =
            "0 ریال";


        finalAmount = 0;


        // برگرداندن انتخاب‌ها به حالت اولیه

        selectGeneral();

        selectFixedCeiling();

        selectFixed();



        // آماده ورود مجدد اطلاعات

        setTimeout(() => {

            sitePercentInput.focus();

            sitePercentInput.select();

        }, 100);

    }



    // F8 = بازگشت به صفحه اصلی

    if (event.key === "F8") {

        event.preventDefault();

        window.location.href =
            "index.html";

    }

}
```

);
