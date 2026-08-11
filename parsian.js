let technical = 727000;
let finalAmount = 0;

let ceilingMode = "fixed";
let specialty = "general";
let selectedLimit = 20000000;

// ===============================
// عناصر صفحه
// ===============================

const sitePercentInput = document.getElementById("sitePercent");
const outsideInput = document.getElementById("outside");
const herasiInput = document.getElementById("herasi");

const customTechnicalInput =
document.getElementById("customTechnical");

const customCeilingInput =
document.getElementById("customCeiling");

const resultBox =
document.getElementById("result");

const toastBox =
document.getElementById("toast");

// ===============================
// اعداد
// ===============================

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

// ===============================
// جداکننده هزارگان
// ===============================

function formatNumberInput(input) {

```
if (!input) return;

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

formatNumberInput(customCeilingInput);
formatNumberInput(customTechnicalInput);
formatNumberInput(outsideInput);
formatNumberInput(herasiInput);

// ===============================
// تخصص
// ===============================

function selectGeneral() {

```
specialty = "general";

selectedLimit = 20000000;


document.getElementById(
    "generalRadio"
).checked = true;


document.getElementById(
    "specialistRadio"
).checked = false;


document.getElementById(
    "generalCard"
).classList.add("active");


document.getElementById(
    "specialistCard"
).classList.remove("active");


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


document.getElementById(
    "generalRadio"
).checked = false;


document.getElementById(
    "specialistRadio"
).checked = true;


document.getElementById(
    "specialistCard"
).classList.add("active");


document.getElementById(
    "generalCard"
).classList.remove("active");


if (ceilingMode === "fixed") {

    document.getElementById(
        "fixedCeilingText"
    ).textContent =
        "50,000,000 ریال";

}
```

}

// ===============================
// سقف تعهد
// ===============================

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


document.getElementById(
    "fixedCeilingCard"
).classList.add("active");


document.getElementById(
    "customCeilingCard"
).classList.remove("active");


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


document.getElementById(
    "customCeilingCard"
).classList.add("active");


document.getElementById(
    "fixedCeilingCard"
).classList.remove("active");


customCeilingInput.focus();

customCeilingInput.select();
```

}

// ===============================
// حق فنی
// ===============================

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


document.getElementById(
    "fixedCard"
).classList.add("active");


document.getElementById(
    "customCard"
).classList.remove("active");
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


document.getElementById(
    "customCard"
).classList.add("active");


document.getElementById(
    "fixedCard"
).classList.remove("active");


customTechnicalInput.focus();

customTechnicalInput.select();
```

}

// ===============================
// محاسبه
// ===============================

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


// فرمول پارسیان
const calculatedAmount =
    Math.floor(
        (outside + technicalValue) *
        ((100 - percent) / 100) +
        herasi
    );


// سقف تعهد
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

// ===============================
// تعیین ترتیب فیلدها
// ===============================

function getFields() {

```
const fields = [];


// فقط وقتی سقف تعهد دلخواه است
if (
    customCeilingInput &&
    !customCeilingInput.disabled
) {

    fields.push(customCeilingInput);

}


// فقط وقتی حق فنی دلخواه است
if (
    customTechnicalInput &&
    !customTechnicalInput.disabled
) {

    fields.push(customTechnicalInput);

}


// ترتیب اصلی پارسیان
fields.push(sitePercentInput);
fields.push(outsideInput);
fields.push(herasiInput);


return fields;
```

}

// ===============================
// پیدا کردن اولین فیلد قابل ورود
// ===============================

function focusFirstField() {

```
const fields = getFields();


for (const field of fields) {

    if (
        field &&
        !field.disabled &&
        field.offsetParent !== null
    ) {

        field.focus();

        field.select();

        return true;

    }

}


return false;
```

}

// ===============================
// Enter
// ===============================

window.addEventListener(
"keydown",
function (event) {

```
    if (event.key !== "Enter") {
        return;
    }


    event.preventDefault();

    event.stopPropagation();


    const fields = getFields();

    const active =
        document.activeElement;


    const index =
        fields.indexOf(active);


    // اگر الان روی یکی از فیلدها هستیم
    if (index !== -1) {


        // فیلد بعدی وجود دارد
        if (
            index + 1 <
            fields.length
        ) {

            const nextField =
                fields[index + 1];


            nextField.focus();

            nextField.select();

            return;

        }


        // آخرین فیلد
        calculate();


        setTimeout(function () {

            resultBox.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        }, 100);


        return;

    }


    // صفحه تازه باز شده
    // یا فوکوس روی هیچ فیلدی نیست

    focusFirstField();

},
true
```

);

// ===============================
// F2 = کپی مبلغ
// ===============================

function copyResult() {

```
navigator.clipboard.writeText(
    finalAmount.toString()
);


toastBox.classList.add("show");


setTimeout(function () {

    toastBox.classList.remove("show");

}, 1500);
```

}

// ===============================
// F2 / F4 / F8
// ===============================

window.addEventListener(
"keydown",
function (event) {

```
    // ---------------------------
    // F2
    // ---------------------------

    if (event.key === "F2") {

        event.preventDefault();

        copyResult();

    }


    // ---------------------------
    // F4
    // ---------------------------

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


        selectGeneral();

        selectFixedCeiling();

        selectFixed();


        setTimeout(function () {

            sitePercentInput.focus();

            sitePercentInput.select();

        }, 100);

    }


    // ---------------------------
    // F8
    // ---------------------------

    if (event.key === "F8") {

        event.preventDefault();

        window.location.href =
            "index.html";

    }

}
```

);

// ===============================
// آماده‌سازی صفحه
// ===============================

window.addEventListener(
"load",
function () {

```
    // مطمئن شو حالت اولیه درست است

    selectGeneral();

    selectFixedCeiling();

    selectFixed();


    // فوکوس را روی خود صفحه قرار می‌دهیم
    // تا اولین Enter حتماً توسط صفحه دریافت شود

    document.body.setAttribute(
        "tabindex",
        "-1"
    );

    document.body.focus();

}
```

);
