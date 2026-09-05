// Elements
const numsInput     = document.getElementById("numslength");
const rangeInput    = document.getElementById("rangelength");
const lower         = document.getElementById("lowercase");
const upper         = document.getElementById("uppercase");
const number        = document.getElementById("number");
const symbol        = document.getElementById("symbol");
const generateBtn   = document.getElementById('generateBtn');
const copyBtn       = document.getElementById('copyBtn');
const password      = document.getElementById("password");
const strengthText  = document.getElementById('strengthText');
const strengthBar   = document.getElementById('strengthBar');
const toggleShow    = document.getElementById('toggleShow');

// Sync Silder with Number
const updateNums = (val)=>{
    numsInput.value = parseInt(val);
}
const updateSlider = (val)=>{
    if (val < 8) val = 8;
    if (val > 32) val = 32;
    rangeInput.value = parseInt(val);
}

const generatePassword = () =>{
    const length = parseInt(rangeInput.value);
    let chars = '';
    if (lower.checked) 
        chars += "abcdefghijklmnopqrstuvwxyz";
    if (upper.checked)
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number.checked)
        chars += "0123456789";
    if (symbol.checked)
        chars += "!@#$%^&*()";

    if (!chars) {
        alert("Please select at least one character type!");
        return;
    }

    let generatepass = "";
    for (let i = 0; i < length; i++) {
        generatepass += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    password.value = generatepass;
    validateAndShowStrength(generatepass);
}

function copyPassword() {
    const genpass = password.value;
    if(!genpass){
        alert('No password to copy.');
        return;
    }
    navigator.clipboard.writeText(genpass).then(() => {
        alert("Password copied to clipboard!");
    },()=>{
        alert('Copy failed. Select and copy manually.');
    })
}

function validateAndShowStrength(password) {

    const hasLower  = /[a-z]/.test(password);
    const hasUpper  = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()]/.test(password);
    const len       = password.length;
    
    let strength = 0;
    if (len >= 8)  strength += 1;
    if (len >= 12) strength += 1;
    if (hasUpper)  strength += 1;
    if (hasLower)  strength += 1;
    if (hasNumber) strength += 1;
    if (hasSymbol) strength += 1;

    let label = 'Very Weak';
    let width = '10%';
    if (strength <= 2) { label = 'Very Weak'; width = '10%';}
    else if (strength === 3) { label = 'Weak'; width = '35%';}
    else if (strength === 4) { label = 'Medium'; width = '60%';}
    else if (strength === 5) { label = 'Strong'; width = '85%';}
    else if (strength >= 6) { label = 'Very Strong'; width = '100%';}
    
    strengthText.innerText = `Strength: ${label}`;
    strengthBar.style.width = width;

    if (score <= 2) strengthBar.style.background = '#ff6b6b';
    else if (score === 3) strengthBar.style.background = '#ff9f43';
    else if (score === 4) strengthBar.style.background = '#ffd166';
    else if (score === 5) strengthBar.style.background = '#06d6a0';
    else strengthBar.style.background = 'linear-gradient(90deg,#06d6a0,#118ab2)';
}

// Live validation when user edits the input
password.addEventListener('input', (e) => {
    const val = e.target.value;
    validateAndShowStrength(val);
});

// Show/hide toggle
toggleShow.addEventListener('change', () => {
    password.type = toggleShow.checked ? 'text' : 'password';
});

// Buttons
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);
// Initialize UI (show initial strength for empty)
validateAndShowStrength(password.value);