document.getElementById('logo').addEventListener('click', function() {
    window.location.reload();
});

const resetButton = document.getElementById('reset-button');
const radioImageButtons = document.querySelectorAll('input[name="radio-image"]');
const radioScannerButtons = document.querySelectorAll('input[name="radio-scanner"]');
const swiFolderInput = document.getElementById('swi-folder-input');
const phaseFolderInput = document.getElementById('phase-folder-input');
const swiFileInfo = document.getElementById('swi-file-info');
const phaseFileInfo = document.getElementById('phase-file-info');
const removeSwiButton = document.getElementById('remove-swi-button');
const removePhaseButton = document.getElementById('remove-phase-button');

function checkRadioButtons() {
    const imageChecked = Array.from(radioImageButtons).some(radio => radio.checked);
    const scannerChecked = Array.from(radioScannerButtons).some(radio => radio.checked);
    const isAnyChecked = imageChecked || scannerChecked;

    resetButton.disabled = !isAnyChecked;
    resetButton.classList.toggle('text-white/20', !isAnyChecked); // Make button look inactive
    resetButton.classList.toggle('text-white', isAnyChecked); // Make button look active
}

function resetForm() {
    radioImageButtons.forEach(radio => radio.checked = false);
    radioScannerButtons.forEach(radio => radio.checked = false);
    swiFileInfo.textContent = 'Select the image file or folder';
    phaseFileInfo.textContent = 'Select the image file or folder';
    swiFileInfo.classList.remove('text-white');
    swiFileInfo.classList.add('text-white/60');
    phaseFileInfo.classList.remove('text-white');
    phaseFileInfo.classList.add('text-white/60');
    removeSwiButton.style.display = 'none';
    removePhaseButton.style.display = 'none';
    checkRadioButtons();
}

function openFolderDialog(inputElement) {
    inputElement.click();
}

function handleFileUpload(event, fileInfoElement, removeButtonElement) {
    const files = event.target.files;
    if (files.length > 0) {
        // Display only the filename
        fileInfoElement.textContent = files[0].name;
        fileInfoElement.classList.remove('text-white/60');
        fileInfoElement.classList.add('text-white');
        removeButtonElement.style.display = 'inline-block';
    }
}

function removeFile(fileInputElement, fileInfoElement, removeButtonElement) {
    fileInputElement.value = ''; // Clear the input
    fileInfoElement.textContent = 'Select the image file or folder';
    fileInfoElement.classList.remove('text-white');
    fileInfoElement.classList.add('text-white/60');
    removeButtonElement.style.display = 'none';
}

radioImageButtons.forEach(radio => {
    radio.addEventListener('change', checkRadioButtons);
});

radioScannerButtons.forEach(radio => {
    radio.addEventListener('change', checkRadioButtons);
});

resetButton.addEventListener('click', resetForm);
document.getElementById('swi-button').addEventListener('click', () => openFolderDialog(swiFolderInput));
document.getElementById('phase-button').addEventListener('click', () => openFolderDialog(phaseFolderInput));
swiFolderInput.addEventListener('change', (event) => handleFileUpload(event, swiFileInfo, removeSwiButton));
phaseFolderInput.addEventListener('change', (event) => handleFileUpload(event, phaseFileInfo, removePhaseButton));
removeSwiButton.addEventListener('click', () => removeFile(swiFolderInput, swiFileInfo, removeSwiButton));
removePhaseButton.addEventListener('click', () => removeFile(phaseFolderInput, phaseFileInfo, removePhaseButton));
