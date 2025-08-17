const socket = io();

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messages = document.getElementById("messages");
const room = window.room;
const userId = window.userId;
socket.emit("join", room.id);

sendBtn.onclick = () => {
  const messageText = messageInput.value.trim();
  const message = {
    sentAt: Date(),
    senderId: userId,
    text: messageText,
  };
  socket.emit("message", message);
  messageInput.value = "";
};

socket.on("message", (message) => {
  console.log(message);
  // Create new message container
  // Create message container
  const msgDiv = document.createElement("div");
  msgDiv.className = "bg-white rounded-lg p-3 shadow";

  // Highlight current user's messages differently
  if (message.senderId === userId) {
    msgDiv.classList.add("bg-blue-100", "self-end"); // You may need to adjust styling or container class
  }

  // Timestamp and sender
  const metaDiv = document.createElement("div");
  metaDiv.className = "text-sm text-gray-500 mb-1";
  metaDiv.textContent = `— ${message.sentAt} | Sender: ${message.senderId}`;

  // Message text
  const textDiv = document.createElement("div");
  textDiv.className = "text-gray-800";
  textDiv.textContent = message.text;

  // Assemble message element
  msgDiv.appendChild(metaDiv);
  msgDiv.appendChild(textDiv);
  messages.appendChild(msgDiv);

  // Auto-scroll
  messages.scrollTop = messages.scrollHeight;
});
