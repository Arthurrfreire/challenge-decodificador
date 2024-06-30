function showInput() {
    document.getElementById('input-placeholder').style.display = 'none';
    const inputTextArea = document.getElementById('input-text');
    inputTextArea.style.display = 'block';
    inputTextArea.focus();
}

function encryptText() {
    const inputText = document.getElementById('input-text').value.trim();
    if (isValidText(inputText)) {
        const encryptedText = customEncrypt(inputText.toLowerCase());
        displayOutput(encryptedText);
    } else {
        showAlert("Por favor, insira apenas letras minúsculas e sem acento.", 'error');
    }
}

function decryptText() {
    const inputText = document.getElementById('input-text').value.trim();
    if (isValidEncryptedText(inputText)) {
        const decryptedText = customDecrypt(inputText);
        displayOutput(decryptedText);
        showAlert("Texto descriptografado com sucesso.", 'success');
    } else {
        showAlert("Texto inválido para descriptografia.", 'error');
    }
}

function isValidText(text) {
    const regex = /^[a-z\s]+$/;
    return regex.test(text);
}

function isValidEncryptedText(text) {
    const regex = /^(enter|imes|ai|ober|ufat|[a-z\s])*$/;
    return regex.test(text) && isTextEncryptedProperly(text);
}

function isTextEncryptedProperly(text) {
    const rules = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };
    const parts = text.split(/\s+/);
    for (let part of parts) {
        let decryptedPart = part.replace(/enter|imes|ai|ober|ufat/g, match => rules[match]);
        if (!/^[a-z]+$/.test(decryptedPart)) {
            return false;
        }
    }
    return true;
}

function customEncrypt(text) {
    const rules = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };
    return text.replace(/[eioua]/g, match => rules[match]);
}

function customDecrypt(text) {
    const rules = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };
    const regex = /enter|imes|ai|ober|ufat/g;
    return text.replace(regex, match => rules[match]);
}

function displayOutput(text) {
    const placeholderImage = document.getElementById('placeholder-image');
    const description = document.getElementById('description');
    const outputText = document.getElementById('output-text');
    const copyButtonContainer = document.getElementById('copy-button-container');
    const rectangle1 = document.getElementById('output-container');

    placeholderImage.style.display = 'none';
    description.style.display = 'none';
    outputText.style.display = 'block';
    outputText.innerText = text;
    copyButtonContainer.style.display = 'flex';

    rectangle1.classList.add('post-click');
    outputText.classList.add('post-click');
}

function copyToClipboard() {
    const outputText = document.getElementById('output-text').innerText;
    navigator.clipboard.writeText(outputText).then(() => {
        showAlert('Texto copiado para a área de transferência', 'success');
    }).catch(err => {
        showAlert('Falha ao copiar texto', 'error');
    });
}

function resetPage() {
    document.getElementById('input-text').value = '';
    document.getElementById('input-placeholder').style.display = 'block';
    document.getElementById('input-text').style.display = 'none';
    const placeholderImage = document.getElementById('placeholder-image');
    const description = document.getElementById('description');
    const outputText = document.getElementById('output-text');
    const copyButtonContainer = document.getElementById('copy-button-container');
    const rectangle1 = document.getElementById('output-container');

    placeholderImage.style.display = 'block';
    description.style.display = 'block';
    outputText.style.display = 'block';
    outputText.innerText = 'Nenhuma mensagem encontrada';
    copyButtonContainer.style.display = 'none';

    rectangle1.classList.remove('post-click');
    outputText.classList.remove('post-click');
}

function showAlert(message, type = 'warning') {
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert-box', `alert-${type}`);
    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

document.getElementById('input-text').addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});
