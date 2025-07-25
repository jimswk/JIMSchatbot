// script.js
const APPS_SCRIPT_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyXUcvGJni72ZUcG_qU_T3UZ6VJdxLauE8vOIOcU9B9ATIICemqCkNC_n3w70uKgXAG/exec'; // URL dari langkah 2.3

document.getElementById('chatForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const userInput = document.getElementById('userInput').value;
    if (!userInput.trim()) return;

    displayMessage(userInput, 'user');
    document.getElementById('userInput').value = ''; // Kosongkan input

    try {
        const response = await fetch(APPS_SCRIPT_WEB_APP_URL, {
            method: 'POST',
            mode: 'cors', // Penting untuk Cross-Origin requests
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: userInput })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayMessage(data.response || data.error || 'Maaf, berlaku ralat.', 'bot');

    } catch (error) {
        console.error('Fetch error:', error);
        displayMessage('Maaf, saya tidak dapat berkomunikasi dengan sistem. Sila cuba lagi.', 'bot');
    }
});

function displayMessage(message, sender) {
    const chatBox = document.getElementById('chatBox');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
}
