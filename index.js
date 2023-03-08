// Constants

const darkModeToggler = document.querySelector("header i");
const generateBtn = document.querySelector("button");
const slider = document.querySelector("#range");
const lengthText = document.querySelector(".input-box span");
const options = document.querySelectorAll(".pass-rule input");
const passText = document.querySelector(".pass-div h2");
const dubInput = document.querySelector("#duplicate");
const passIndicator = document.querySelector(".pass-indicator");
const indicator = document.querySelector("#strength-text");
const copyIcon = document.querySelector(".copy-icon");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQURSTUVWXYZ",
  numbers: "1234567890",
  symbols: "@#$_&-+()/*:;!?",
};
// Variables

let passLength;

// Functions

const changeMode = () => {
  document.body.className =
    document.body.className === "dark-theme" ? "" : "dark-theme";
  darkModeToggler.className =
    document.body.className === "dark-theme" ? "bi bi-sun" : "bi bi-moon-fill";
};

const pwStrength = () => {
  let text;
  if (slider.value < 8) {
    passIndicator.classList.remove("medium", "strong");
    passIndicator.classList.add("weak");
    text = "Weak Password Strength";
  } else if (slider.value <= 14) {
    passIndicator.classList.remove("weak", "strong");
    passIndicator.classList.add("medium");
    text = "Medium Password Strength";
  } else {
    passIndicator.classList.remove("medium", "weak");
    passIndicator.classList.add("strong");
    text = "Strong Password Strength";
  }
  indicator.textContent = text;
};

const generatePassword = () => {
  let staticPassword = "",
    password = "";
  passLength = slider.value;

  options.forEach((option) => {
    if (option.checked && option.id !== "duplicate") {
      staticPassword += characters[option.id];
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (dubInput.checked) {
      !password.includes(randChar) ? (password += randChar) : i--;
    } else {
      password += randChar;
    }
  }
  pwStrength();
  passText.textContent = password;
};

const updateLength = () => {
  lengthText.textContent = slider.value;
  passLength = slider.value;
  generatePassword();
};

const generate = () => {
  window.scrollTo(0, 0);
  generatePassword();
};

const copyText = () => {
  navigator.clipboard.writeText(passText.innerText).then(() => alert("copied"));
};

// Event Listeners

window.addEventListener("load", generatePassword);
darkModeToggler.addEventListener("click", changeMode);
slider.addEventListener("input", updateLength);
generateBtn.addEventListener("click", generate);
copyIcon.addEventListener("click", copyText);
