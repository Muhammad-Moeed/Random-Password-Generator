function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

let slider = document.getElementById('slider');
let passwordLength = document.getElementById('passwordLength');
let generatedPassword = document.getElementById('generatedPassword');
let copyBtn = document.getElementById('copyBtn');
let strength = document.getElementById('strength');

// Get checkbox elements
let uppercaseCheckbox = document.getElementById('uppercase');
let lowercaseCheckbox = document.getElementById('lowercase');
let numbersCheckbox = document.getElementById('numbers');
let symbolsCheckbox = document.getElementById('symbols');

// Update the displayed length when the slider is moved
function updateLength() {
    passwordLength.textContent = slider.value;
    generatePassword(slider.value);
}

// Function to increment or decrement the slider
function changeLength(step) {
    let currentValue = parseInt(slider.value);
    let newValue = currentValue + step;

    if (newValue >= 0 && newValue <= 50) {
        slider.value = newValue;
        updateLength();
    }
}

// Copy password to clipboard
copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(generatedPassword.value).then(() => {
        alert("Password copied!");
    });
});

// Function to generate a random password based on selected checkboxes
function generatePassword(length) {
    let chars = '';

    if (uppercaseCheckbox.checked) {
        chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (lowercaseCheckbox.checked) {
        chars += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (numbersCheckbox.checked) {
        chars += '0123456789';
    }
    if (symbolsCheckbox.checked) {
        chars += '#$&';
    }
    if (chars === '') {
        alert('Please select at least one character set');
        return;
    }
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    generatedPassword.value = password;
    evaluateStrength(password);
}

// Function to evaluate password strength
function evaluateStrength(password) {
    const strength = document.getElementById('strength'); // Assuming you have an element with the id 'strength'
    
    if (password.length > 11) {
        strength.textContent = 'Very strong';
        strength.style.backgroundColor = '#9ae437';
    } else if (password.length > 9) {
        strength.textContent = 'Strong';
        strength.style.backgroundColor = '#d5f2a5';
    } else if (password.length > 7) {
        strength.textContent = 'Good';
        strength.style.backgroundColor = '#ffddbf';
    } else if (password.length > 4) {
        strength.textContent = 'Weak';
        strength.style.backgroundColor = '#ffb370'; 
    } else {
        strength.textContent = 'Very Weak';
        strength.style.backgroundColor = '#ff7800'; 
    }
}

generatePassword(slider.value);

uppercaseCheckbox.addEventListener('change', () => generatePassword(slider.value));
lowercaseCheckbox.addEventListener('change', () => generatePassword(slider.value));
numbersCheckbox.addEventListener('change', () => generatePassword(slider.value));
symbolsCheckbox.addEventListener('change', () => generatePassword(slider.value));
