document.addEventListener("DOMContentLoaded", function () {
    updateChat(); // Initial chat update
});

function sendMessage() {
    var input = document.getElementById("message-input");
    var message = input.value;

    if (message.trim() !== "") {
        appendMessage("You", message);
        input.value = "";

        // Additional logic to send message to server or save it
        // You might want to use AJAX or WebSocket for real-time communication
    }
}

function appendMessage(user, message) {
    var chatMessages = document.getElementById("chat-messages");
    var newMessage = document.createElement("div");
    newMessage.textContent = user + ": " + message;
    chatMessages.appendChild(newMessage);

    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateChat() {
    // Add logic to retrieve previous chat messages from server or storage
    // and display them on the chatMessages element
}
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

server.on('connection', (socket) => {
    console.log('Client connected');

    // Handle messages from clients
    socket.on('message', (message) => {
        console.log(`Received: ${message}`);

        // Broadcast the message to all connected clients
        server.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Handle disconnection
    socket.on('close', () => {
        console.log('Client disconnected');
    });
});
// Example: Sending a message when a button is clicked
document.getElementById('send-button').addEventListener('click', () => {
    const message = document.getElementById('message-input').value;
    sendMessage(message);
});
