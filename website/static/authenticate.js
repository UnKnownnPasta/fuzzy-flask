const formButton = document.getElementById('form-set-final');
const formNext = document.getElementById('form-set-1');
const formPrevious = document.getElementById('form-set-2');
const formFields = Array.from(document.getElementsByClassName('form-set'));

let currentField = 0;
const hiddenAttributes = ['top-hidden', 'bottom-hidden', 'blur-5'];
const visibleAttributes = ['mid-35', 'mid-50', 'mid-visible', 'blur-0'];

function setAttributes(elements, addAttributes, removeAttributes) {
    elements.forEach((element) => {
        element.classList.add(...addAttributes);
        element.classList.remove(...removeAttributes);
    });
}

function switchActiveButton(alternate) {
    if (alternate == 'submit') {
        formNext.style.left = "20%";
        formNext.style.opacity = "0";
        formButton.style.left = "42.8%";
        formButton.style.opacity = "1";
    } else if (alternate == 'next') {
        formNext.style.left = "45%";
        formNext.style.opacity = "1";
        formButton.style.left = "20%";
        formButton.style.opacity = "0";
    }
}

function cycleOptionsForward() {
    if (currentField <= formFields.length - 2) {
        const current = formFields[currentField];
        const next = formFields[currentField + 1];

        setAttributes([current], ['mid-35', 'mid-visible', 'blur-0'], hiddenAttributes);
        setAttributes([next], ['mid-50', 'mid-visible', 'blur-0'], hiddenAttributes);

        if (currentField !== 0) {
            const prev1 = formFields[currentField - 1];
            const prev2 = formFields[currentField - 2];
            setAttributes([prev1, prev2], hiddenAttributes, visibleAttributes);
            setAttributes([prev1, prev2], ['bottom-hidden', 'blur-5'], visibleAttributes);
        }

        if (currentField == formFields.length - 2) {
            switchActiveButton('submit')
        }

        currentField += 2;
    }
}

function cycleOptionsBackward() {
    if (currentField > 2) {
        const prev1 = formFields[currentField - 1];
        const prev2 = formFields[currentField - 2];
        const prev3 = formFields[currentField - 3];
        const prev4 = formFields[currentField - 4];

        setAttributes([prev1, prev2], ['top-hidden', 'blur-5'], visibleAttributes);
        setAttributes([prev4], ['mid-35', 'mid-visible', 'blur-0'], hiddenAttributes);
        setAttributes([prev3], ['mid-50', 'mid-visible', 'blur-0'], hiddenAttributes);

        if (currentField == formFields.length) {
            switchActiveButton('next')
        }

        currentField -= 2;
    }
}

cycleOptionsForward();
formNext.addEventListener('click', cycleOptionsForward);
formPrevious.addEventListener('click', cycleOptionsBackward);
