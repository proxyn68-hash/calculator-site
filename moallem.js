let technical = 727000;
let finalAmount = 0;
let calculatedAmount = 0;
let ceilingMode = "fixed";
let isFirstType = true;
const FIXED_LIMIT = 30000000;

const sitePercentInput = document.getElementById("sitePercent");
const outsideInput = document.getElementById("outside");
const herasiInput = document.getElementById("herasi");
const customTechnicalInput = document.getElementById("customTechnical");
const customCeilingInput = document.getElementById("customCeiling");
const resultBox = document.getElementById("result");
const toastBox = document.getElementById("toast");

function cleanNumber(value) { return String(value ?? "").replace(/,/g, ""); }
function getNumber(value) { return Number(cleanNumber(value)) || 0; }
function formatNumberInput(input) {
    if (!input) return;
    input.addEventListener("input", function() {
        let oldValue = this.value, cursorPosition = this.selectionStart || 0, value = cleanNumber(oldValue);
        if (value !== "" && !isNaN(value)) {
            let formatted = Number(value).toLocaleString("en-US");
            this.value = formatted;
            cursorPosition += formatted.length - oldValue.length;
            this.setSelectionRange(cursorPosition, cursorPosition);
        }
    });
}
[customCeilingInput, customTechnicalInput, outsideInput, herasiInput].forEach(formatNumberInput);

function setType(first) {
    isFirstType = first;
    document.getElementById("staffRadio").checked = first;
    document.getElementById("otherRadio").checked = !first;
    document.getElementById("staffCard").classList.toggle("active", first);
    document.getElementById("otherCard").classList.toggle("active", !first);
    document.getElementById("technicalSection").style.display = first ? "block" : "none";
    if (!first) { technical = 0; }
}
function selectStaff() { setType(true); }
function selectOther() { setType(false); }

function selectFixedCeiling() {
    ceilingMode = "fixed";
    customCeilingInput.disabled = true;
    customCeilingInput.value = "";
    document.getElementById("fixedCeilingRadio").checked = true;
    document.getElementById("customCeilingRadio").checked = false;
    document.getElementById("fixedCeilingCard").classList.add("active");
    document.getElementById("customCeilingCard").classList.remove("active");
}
function selectCustomCeiling() {
    ceilingMode = "custom";
    customCeilingInput.disabled = false;
    document.getElementById("fixedCeilingRadio").checked = false;
    document.getElementById("customCeilingRadio").checked = true;
    document.getElementById("customCeilingCard").classList.add("active");
    document.getElementById("fixedCeilingCard").classList.remove("active");
    customCeilingInput.focus();
    customCeilingInput.select();
}
function selectFixed() {
    technical = 727000;
    customTechnicalInput.disabled = true;
    customTechnicalInput.value = "";
    document.getElementById("fixedRadio").checked = true;
    document.getElementById("customRadio").checked = false;
    document.getElementById("fixedCard").classList.add("active");
    document.getElementById("customCard").classList.remove("active");
}
function selectCustom() {
    technical = 0;
    customTechnicalInput.disabled = false;
    document.getElementById("fixedRadio").checked = false;
    document.getElementById("customRadio").checked = true;
    document.getElementById("customCard").classList.add("active");
    document.getElementById("fixedCard").classList.remove("active");
    customTechnicalInput.focus();
    customTechnicalInput.select();
}

function calculate() {
    const percent = Number(sitePercentInput.value) || 0;
    const outside = getNumber(outsideInput.value);
    const herasi = getNumber(herasiInput.value);
    const technicalValue = customTechnicalInput.disabled ? technical : getNumber(customTechnicalInput.value);
    const base = outside * ((100 - percent) / 100);
    calculatedAmount = Math.floor(isFirstType ? (base + technicalValue + herasi) : (base + herasi));
    const selectedLimit = ceilingMode === "custom" ? getNumber(customCeilingInput.value) : FIXED_LIMIT;
    finalAmount = Math.min(calculatedAmount, selectedLimit);
    resultBox.textContent = finalAmount.toLocaleString("en-US") + " ریال";
}

function getFields() {
    const fields = [];
    if (!customCeilingInput.disabled) fields.push(customCeilingInput);
    if (isFirstType && !customTechnicalInput.disabled) fields.push(customTechnicalInput);
    fields.push(sitePercentInput, outsideInput, herasiInput);
    return fields;
}

document.addEventListener("keydown", function(e) {
    if (e.key === "F8") {
        e.preventDefault();
        window.location.href = "index.html";
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key !== "Enter") return;
    const active = document.activeElement;
    const fields = getFields();
    const index = fields.indexOf(active);
    if (index !== -1) {
        e.preventDefault();
        if (fields[index + 1]) {
            fields[index + 1].focus();
            fields[index + 1].select();
        } else {
            calculate();
            setTimeout(() => resultBox.scrollIntoView({behavior:"smooth", block:"center"}), 100);
        }
        return;
    }
    if (!active || (active.tagName !== "INPUT" && active.tagName !== "TEXTAREA")) {
        e.preventDefault();
        const first = fields.find(x => x && !x.disabled && x.offsetParent !== null);
        if (first) { first.focus(); first.select(); }
    }
});

function copyResult() {
    navigator.clipboard.writeText(finalAmount.toString());
    toastBox.classList.add("show");
    setTimeout(() => toastBox.classList.remove("show"), 1500);
}

document.addEventListener("keydown", function(e) {
    if (e.key === "F2") { e.preventDefault(); copyResult(); }
    if (e.key === "F4") {
        e.preventDefault();
        customCeilingInput.value = "";
        customTechnicalInput.value = "";
        sitePercentInput.value = "";
        outsideInput.value = "";
        herasiInput.value = "";
        resultBox.textContent = "0 ریال";
        finalAmount = 0;
        setType(true);
        selectFixedCeiling();
        selectFixed();
        setTimeout(() => { sitePercentInput.focus(); sitePercentInput.select(); }, 100);
    }
});
