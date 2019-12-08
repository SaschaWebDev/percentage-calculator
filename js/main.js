// DOM Elements
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


// CALCULATE RESULTS

// Calculate FROM
methodFromFirstInput.addEventListener('input', () => {
  const firstInput = methodFromFirstInput.value;
  const secondInput = methodFromSecondInput.value;
  const rounding = switchRounding.checked;

  if (!firstInput || !secondInput) {
    return;
  } else {
    rounding ? methodFromResultInput.value = methodFromResultInput.value = roundNumber(((secondInput * (firstInput / 100)) / 100) * 100, 2) : methodFromResultInput.value = ((secondInput * (firstInput / 100)) / 100) * 100;
  }
});

methodFromSecondInput.addEventListener('input', () => {
  const firstInput = methodFromFirstInput.value;
  const secondInput = methodFromSecondInput.value;
  const rounding = switchRounding.checked;

  if (!firstInput || !secondInput) {
    return;
  } else {
    rounding ? methodFromResultInput.value = methodFromResultInput.value = roundNumber(((secondInput * (firstInput / 100)) / 100) * 100, 2) : methodFromResultInput.value = ((secondInput * (firstInput / 100)) / 100) * 100;
  }
});







 // MATH FUNCTIONS

 // ROUNDING
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


switchRounding.addEventListener('click', () => {
  const rounding = switchRounding.checked;

  if (rounding) {
    if (methodFromFirstInput.value && methodFromSecondInput.value) {
      methodFromResultInput.value = roundNumber(((methodFromSecondInput.value * (methodFromFirstInput.value / 100)) / 100) * 100, 2);
    }
    if (methodOfFirstInput.value && methodOfSecondInput.value) {
      methodOfResultInput.value = roundNumber(((methodOfSecondInput.value * (methodOfFirstInput.value / 100)) / 100) * 100, 2);
    }
    if (methodIncreaseFirstInput.value && methodIncreaseSecondInput.value) {
      methodIncreaseResultInput.value = roundNumber(((methodIncreaseSecondInput.value * (methodIncreaseFirstInput.value / 100)) / 100) * 100, 2);
    }
  } else {
    if (methodFromFirstInput.value && methodFromSecondInput.value) {
      methodFromResultInput.value = ((methodFromSecondInput.value * (methodFromFirstInput.value / 100)) / 100) * 100;
    }
    if (methodOfFirstInput.value && methodOfSecondInput.value) {
      methodOfResultInput.value = ((methodOfSecondInput.value * (methodOfFirstInput.value / 100)) / 100) * 100;
    }
    if (methodIncreaseFirstInput.value && methodIncreaseSecondInput.value) {
      methodIncreaseResultInput.value = ((methodIncreaseSecondInput.value * (methodIncreaseFirstInput.value / 100)) / 100) * 100;
    }
  }
});



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
