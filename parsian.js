let technical = 727000;
let finalAmount = 0;
let ceilingMode = "fixed";
let specialty = "general";
let selectedLimit = 20000000;

const sitePercentInput = document.getElementById("sitePercent");
const outsideInput = document.getElementById("outside");
const herasiInput = document.getElementById("herasi");
const customTechnicalInput = document.getElementById("customTechnical");
const customCeilingInput = document.getElementById("customCeiling");
const resultBox = document.getElementById("result");
const toastBox = document.getElementById("toast");

function cleanNumber(value) {
    return String(value ?? "").replace(/,/g, "");
}

function getNumber(value) {
    return Number(cleanNumber(value)) || 0;
}

function formatNumberInput(input) {
    if (!input) return;

    input.addEventListener("input", function () {
        let oldValue = this.value;
        let cursorPosition = this.selectionStart || 0;
        let value = cleanNumber(oldValue);

        if (value !== "" && !isNaN(value)) {
            let formatted = Number(value).toLocaleString("en-US");

            this.value = formatted;

            cursorPosition += formatted.length - oldValue.length;

            this.setSelectionRange(
                cursorPosition,
                cursorPosition
            );
        }
    });
}

formatNumberInput(customCeilingInput);
formatNumberInput(customTechnicalInput);
formatNumberInput(outsideInput);
formatNumberInput(herasiInput);


// ==============================
// نوع تخصص
// ==============================

function selectGeneral() {

    specialty = "general";
    selectedLimit = 20000000;

    document.getElementById("generalRadio").checked = true;
    document.getElementById("specialistRadio").checked = false;

    document.getElementById("generalCard")
        .classList.add("active");

    document.getElementById("specialistCard")
        .classList.remove("active");

    if (ceilingMode === "fixed") {

        document.getElementById("fixedCeilingText")
            .textContent = "20,000,000 ریال";

    }
}


function selectSpecialist() {

    specialty = "specialist";
    selectedLimit = 50000000;

    document.getElementById("generalRadio").checked = false;
    document.getElementById("specialistRadio").checked = true;

    document.getElementById("specialistCard")
        .classList.add("active");

    document.getElementById("generalCard")
        .classList.remove("active");

    if (ceilingMode === "fixed") {

        document.getElementById("fixedCeilingText")
            .textContent = "50,000,000 ریال";

    }
}


// ==============================
// سقف تعهد
// ==============================

function selectFixedCeiling() {

    ceilingMode = "fixed";

    if (specialty === "specialist") {
        selectedLimit = 50000000;
    } else {
        selectedLimit = 20000000;
    }

    customCeilingInput.disabled = true;
    customCeilingInput.value = "";

    document.getElementById("fixedCeilingRadio").checked = true;
    document.getElementById("customCeilingRadio").checked = false;

    document.getElementById("fixedCeilingCard")
        .classList.add("active");

    document.getElementById("customCeilingCard")
        .classList.remove("active");

    document.getElementById("fixedCeilingText")
        .textContent =
        selectedLimit.toLocaleString("en-US") +
        " ریال";
}


function selectCustomCeiling() {

    ceilingMode = "custom";

    customCeilingInput.disabled = false;

    document.getElementById("fixedCeilingRadio").checked = false;
    document.getElementById("customCeilingRadio").checked = true;

    document.getElementById("customCeilingCard")
        .classList.add("active");

    document.getElementById("fixedCeilingCard")
        .classList.remove("active");

    customCeilingInput.focus();
    customCeilingInput.select();
}


// ==============================
// حق فنی
// ==============================

function selectFixed() {

    technical = 727000;

    customTechnicalInput.disabled = true;
    customTechnicalInput.value = "";

    document.getElementById("fixedRadio").checked = true;
    document.getElementById("customRadio").checked = false;

    document.getElementById("fixedCard")
        .classList.add("active");

    document.getElementById("customCard")
        .classList.remove("active");
}


function selectCustom() {

    technical = 0;

    customTechnicalInput.disabled = false;

    document.getElementById("fixedRadio").checked = false;
    document.getElementById("customRadio").checked = true;

    document.getElementById("customCard")
        .classList.add("active");

    document.getElementById("fixedCard")
        .classList.remove("active");

    customTechnicalInput.focus();
    customTechnicalInput.select();
}


// ==============================
// محاسبه پارسیان
// ==============================

function calculate() {

    const outsideValue =
        getNumber(outsideInput.value);

    const herasiValue =
        getNumber(herasiInput.value);

    const sitePercent =
        Number(cleanNumber(sitePercentInput.value)) || 0;

    const technicalValue =
        customTechnicalInput.disabled
            ? technical
            : getNumber(customTechnicalInput.value);


    const calculatedAmount =
        Math.floor(
            (outsideValue + technicalValue) *
            ((100 - sitePercent) / 100) +
            herasiValue
        );


    let limit;

    if (ceilingMode === "custom") {

        limit =
            getNumber(customCeilingInput.value);

    } else {

        limit =
            selectedLimit;

    }


    finalAmount =
        Math.min(
            calculatedAmount,
            limit
        );


    resultBox.textContent =
        finalAmount.toLocaleString("en-US") +
        " ریال";
}


// ==============================
// ترتیب فیلدها
// ==============================

function getFields() {

    const fields = [];

    if (
        customCeilingInput &&
        !customCeilingInput.disabled
    ) {

        fields.push(customCeilingInput);

    }


    if (
        customTechnicalInput &&
        !customTechnicalInput.disabled
    ) {

        fields.push(customTechnicalInput);

    }


    fields.push(
        sitePercentInput,
        outsideInput,
        herasiInput
    );


    return fields.filter(Boolean);
}


// ==============================
// Enter
// ==============================

document.addEventListener("keydown", function (event) {

    if (event.key !== "Enter") {
        return;
    }


    const active =
        document.activeElement;

    const fields =
        getFields();

    const index =
        fields.indexOf(active);


    if (index !== -1) {

        event.preventDefault();


        if (fields[index + 1]) {

            fields[index + 1].focus();
            fields[index + 1].select();

        } else {

            calculate();

            setTimeout(function () {

                resultBox.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 100);

        }

        return;
    }


    if (
        !active ||
        (
            active.tagName !== "INPUT" &&
            active.tagName !== "TEXTAREA"
        )
    ) {

        event.preventDefault();


        const first =
            fields.find(function (input) {

                return (
                    input &&
                    !input.disabled &&
                    input.offsetParent !== null
                );

            });


        if (first) {

            first.focus();
            first.select();

        }

    }

});


// ==============================
// کپی مبلغ
// ==============================

function copyResult() {

    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        navigator.clipboard.writeText(
            finalAmount.toString()
        );

    } else {

        const temp =
            document.createElement("textarea");

        temp.value =
            finalAmount.toString();

        temp.style.position = "fixed";
        temp.style.opacity = "0";

        document.body.appendChild(temp);

        temp.select();

        document.execCommand("copy");

        temp.remove();

    }


    toastBox.classList.add("show");


    setTimeout(function () {

        toastBox.classList.remove("show");

    }, 1500);

}


// ==============================
// میانبرها
// ==============================

document.addEventListener("keydown", function (event) {


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


        selectGeneral();
        selectFixedCeiling();
        selectFixed();


        setTimeout(function () {

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

});
