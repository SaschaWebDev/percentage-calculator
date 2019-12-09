// DOM Elements
const body = document.body;
const container = document.querySelector('.container');
const methodContainer = document.querySelectorAll('.method-container');
const inputs = document.querySelectorAll('.modern');
const switches = document.querySelectorAll('.switch');

const methodFromFirstInput = document.getElementById('from-first-input');
const methodFromSecondInput = document.getElementById('from-second-input');
const methodFromResultInput = document.getElementById('from-result-input');

const methodOfFirstInput = document.getElementById('of-first-input');
const methodOfSecondInput = document.getElementById('of-second-input');
const methodOfResultInput = document.getElementById('of-result-input');

const methodIncreaseFirstInput = document.getElementById('increase-first-input');
const methodIncreaseSecondInput = document.getElementById('increase-second-input');
const methodIncreaseResultInput = document.getElementById('increase-result-input');

const buttonConvert = document.getElementById('button-convert');
const switchRounding = document.getElementById('switch-rounding');
const switchTheme = document.getElementById('switch-theme');

const themeSymbol = document.getElementById('theme-symbol');
const convertSymbol = document.getElementById('convert-symbol');

let resultFromLocalized = false;
let resultOfLocalized = false;
let resultIncreaseLocalized = false;

// On window load check for Dark Mode and rounding preferences in localStorage
window.onload = () => {
  // String to number with + prefix
  if(localStorage.getItem('rounding') !== null){
    localStorage.getItem('rounding') === "true" ? switchRounding.checked = true : switchRounding.checked = false;
  }

  if(localStorage.getItem('dark-theme') !== null){
    localStorage.getItem('dark-theme') === "true" ? switchTheme.checked = true : switchTheme.checked = false;
    localStorage.getItem('dark-theme') === "true" ? themeSymbol.classList.add("ghost") : themeSymbol.classList.add("book");
    // set light theme
    if(localStorage.getItem('dark-theme') === "false"){
      letItShine();
    }
  }
};

// CALCULATE RESULTS

// Calculate FROM
methodFromFirstInput.addEventListener('input', () => {
  const firstInput = methodFromFirstInput.value;
  const secondInput = methodFromSecondInput.value;
  const rounding = switchRounding.checked;

  resultFromLocalized = false;

  if (!firstInput || !secondInput) {
    return;
  } else {
    rounding ? methodFromResultInput.value = roundNumber(percentageFrom(firstInput, secondInput), 2) : methodFromResultInput.value = percentageFrom(firstInput, secondInput);
  }
});

methodFromSecondInput.addEventListener('input', () => {
  const firstInput = methodFromFirstInput.value;
  const secondInput = methodFromSecondInput.value;
  const rounding = switchRounding.checked;

  resultFromLocalized = false;

  if (!firstInput || !secondInput) {
    return;
  } else {
    rounding ? methodFromResultInput.value = roundNumber(percentageFrom(firstInput, secondInput), 2) : methodFromResultInput.value = percentageFrom(firstInput, secondInput);
  }
});

// Calculate OF
methodOfFirstInput.addEventListener('input', () => {
  const firstInput = methodOfFirstInput.value;
  const secondInput = methodOfSecondInput.value;
  const rounding = switchRounding.checked;

  resultOfLocalized = false;
  
  if (!firstInput || !secondInput) {
    return;
  } else {
    rounding ? methodOfResultInput.value = roundNumber(percentageOf(firstInput, secondInput), 2) : methodOfResultInput.value = percentageOf(firstInput, secondInput);
  }
});

methodOfSecondInput.addEventListener('input', () => {
  const firstInput = methodOfFirstInput.value;
  const secondInput = methodOfSecondInput.value;
  const rounding = switchRounding.checked;

  resultOfLocalized = false;

  if (!firstInput || !secondInput) {
    return;
  } else {
    rounding ? methodOfResultInput.value = roundNumber(percentageOf(firstInput, secondInput), 2) : methodOfResultInput.value = percentageOf(firstInput, secondInput);
  }
});

// Calculate INCREASE
methodIncreaseFirstInput.addEventListener('input', () => {
  const firstInput = methodIncreaseFirstInput.value;
  const secondInput = methodIncreaseSecondInput.value;
  const rounding = switchRounding.checked;

  resultIncreaseLocalized = false;

  if (!firstInput || !secondInput) {
    return;
  } else {
    rounding ? methodIncreaseResultInput.value = roundNumber(percentageIncrease(firstInput, secondInput), 2) : methodIncreaseResultInput.value = percentageIncrease(firstInput, secondInput);
  }
});

methodIncreaseSecondInput.addEventListener('input', () => {
  const firstInput = methodIncreaseFirstInput.value;
  const secondInput = methodIncreaseSecondInput.value;
  const rounding = switchRounding.checked;

  resultIncreaseLocalized = false;

  if (!firstInput || !secondInput) {
    return;
  } else {
    rounding ? methodIncreaseResultInput.value = roundNumber(percentageIncrease(firstInput, secondInput), 2) : methodIncreaseResultInput.value = percentageIncrease(firstInput, secondInput);
  }
});

// Prevent insertion of comma in inputs

methodFromFirstInput.addEventListener('beforeinput', e => {
  e === ',' ? console.log('LOL') : console.log("WELL");
  
});


 // ROUNDING Math
function roundNumber(num, scale) {
  if(!("" + num).includes("e")) {
    return +(Math.round(num + "e+" + scale)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if(+arr[1] + scale > 0) {
      sig = "+";
    }
    return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
  }
}

// PREFERENCES 

switchRounding.addEventListener('click', () => {
  const rounding = switchRounding.checked;

  if (rounding) {
    if (methodFromFirstInput.value && methodFromSecondInput.value) {
      methodFromResultInput.value = roundNumber(((methodFromSecondInput.value * (methodFromFirstInput.value / 100)) / 100) * 100, 2);
    }
    if (methodOfFirstInput.value && methodOfSecondInput.value) {
      methodOfResultInput.value = roundNumber(((methodOfFirstInput.value * 100) / methodOfSecondInput.value), 2);
    }
    if (methodIncreaseFirstInput.value && methodIncreaseSecondInput.value) {
      methodIncreaseResultInput.value = roundNumber((((methodIncreaseSecondInput.value - methodIncreaseFirstInput.value) / methodIncreaseFirstInput.value) * 100), 2);
    }
    localStorage.setItem('rounding', true);
  } else {
    if (methodFromFirstInput.value && methodFromSecondInput.value) {
      methodFromResultInput.value = ((methodFromSecondInput.value * (methodFromFirstInput.value / 100)) / 100) * 100;
    }
    if (methodOfFirstInput.value && methodOfSecondInput.value) {
      methodOfResultInput.value = ((methodOfFirstInput.value * 100) / methodOfSecondInput.value);
    }
    if (methodIncreaseFirstInput.value && methodIncreaseSecondInput.value) {
      methodIncreaseResultInput.value = (((methodIncreaseSecondInput.value - methodIncreaseFirstInput.value) / methodIncreaseFirstInput.value) * 100);
    }
    localStorage.setItem('rounding', false);
  }
});

switchTheme.addEventListener('click', () => {
  switchTheme.checked === true ? localStorage.setItem('dark-theme', true) : localStorage.setItem('dark-theme', false);
  switchTheme.checked === true ? themeSymbol.classList.remove("book") : themeSymbol.classList.remove("ghost");
  switchTheme.checked === true ? themeSymbol.classList.add("ghost") : themeSymbol.classList.add("book");
  switchTheme.checked === true ? letsGetSpooky() : letItShine();
});

convertSymbol.addEventListener('click', () => {
  convertSymbol.classList.add('fa-spin');
  setTimeout(
    function() {
      convertSymbol.classList.remove('fa-spin');
    }, 1000);
});

// Convert results once to german notation

buttonConvert.addEventListener('click', () => {
  convertSymbol.classList.add('fa-spin');
  setTimeout(
    function() {
      convertSymbol.classList.remove('fa-spin');
    }, 1000);

    if(methodFromFirstInput.value && methodFromSecondInput.value && !resultFromLocalized) {
      methodFromResultInput.value = parseFloat(methodFromResultInput.value).toLocaleString('de-DE', {
        style: 'decimal', 
        currency: 'EUR', 
        minimumFractionDigits: 2
      });
      resultFromLocalized = true;
    }

    if(methodOfFirstInput.value && methodOfSecondInput.value && !resultOfLocalized) {
      methodOfResultInput.value = parseFloat(methodOfResultInput.value).toLocaleString('de-DE', {
        style: 'decimal', 
        currency: 'EUR', 
        minimumFractionDigits: 2
      });
      resultOfLocalized = true;
    }

    if(methodIncreaseFirstInput.value && methodIncreaseSecondInput.value && !resultIncreaseLocalized) {
      methodIncreaseResultInput.value = parseFloat(methodIncreaseResultInput.value).toLocaleString('de-DE', {
        style: 'decimal', 
        currency: 'EUR', 
        minimumFractionDigits: 2
      });
      resultIncreaseLocalized = true;
    }
});


// MATH FUNCTIONS

function percentageFrom(num1, num2) {
  return ((num2 * (num1 / 100)) / 100) * 100;
}

function percentageOf(num1, num2) {
  return (num1 * 100) / num2;
}

function percentageIncrease(num1, num2) {
  return ((num2 - num1) / num1) * 100
}


// COPY TO CLIPBOARD

// Copy result of FROM method to clipboard
methodFromResultInput.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const result = methodFromResultInput.value;

  if (!result) {
    return;
  } else {
    textarea.value = result;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
});

// Copy result of OF method to clipboard
methodOfResultInput.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const result = methodOfResultInput.value;

  if (!result) {
    return;
  } else {
    textarea.value = result;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
});

// Copy result of INCREASE method to clipboard
methodIncreaseResultInput.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const result = methodIncreaseResultInput.value;

  if (!result) {
    return;
  } else {
    textarea.value = result;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
});

// Clear input on click

methodFromFirstInput.addEventListener('click', () => {
  methodFromFirstInput.value = "";
  methodFromResultInput.value = "";
});

methodFromSecondInput.addEventListener('click', () => {
  methodFromSecondInput.value = "";
  methodFromResultInput.value = "";
});

methodOfFirstInput.addEventListener('click', () => {
  methodOfFirstInput.value = "";
  methodOfResultInput.value = "";
});

methodOfSecondInput.addEventListener('click', () => {
  methodOfSecondInput.value = "";
  methodOfResultInput.value = "";
});

methodIncreaseFirstInput.addEventListener('click', () => {
  methodIncreaseFirstInput.value = "";
  methodIncreaseResultInput.value = "";
});

methodIncreaseSecondInput.addEventListener('click', () => {
  methodIncreaseSecondInput.value = "";
  methodIncreaseResultInput.value = "";
});

// SET LIGHT MODE

function letItShine() {
  body.classList.add('light-background');
      container.classList.add('light-container');
      methodContainer.forEach(element => element.classList.add('light-method-container'))
      inputs.forEach(element => element.classList.add('light-container'))
      buttonConvert.classList.add('light-method-container')
      buttonConvert.classList.remove('convert-dark')
      buttonConvert.classList.add('convert-light')
      switches.forEach(element => element.classList.add('light-method-container'))
      switches.forEach(element => element.classList.add('switch-light'))
}

function letsGetSpooky() {
  body.classList.remove('light-background');
  container.classList.remove('light-container');
  methodContainer.forEach(element => element.classList.remove('light-method-container'))
  inputs.forEach(element => element.classList.remove('light-container'))
  buttonConvert.classList.remove('light-method-container')
  buttonConvert.classList.add('convert-dark')
  buttonConvert.classList.remove('convert-light')
  switches.forEach(element => element.classList.remove('light-method-container'))
  switches.forEach(element => element.classList.remove('switch-light'))
}