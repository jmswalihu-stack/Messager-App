const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const mediaInput = document.getElementById('media');
const messagesDiv = document.getElementById('messages');
// ngrok auth -- 
// Render message to chat
function addMessage(msg) {
  const div = document.createElement('div');
  if (msg.type === 'media') {
    if (msg.mediaType.startsWith('image/')) {
      div.innerHTML = `<b>${msg.user || 'Anon'}:</b> <br><img src="${msg.url}" alt="" class="media">`;
    } else {
      div.innerHTML = `<b>${msg.user || 'Anon'}:</b> <br><a href="${msg.url}" target="_blank">${msg.originalName}</a>`;
    }
  } else {
    div.textContent = `${msg.user || 'Anon'}: ${msg.text}`;
  }
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Load chat history
socket.on('chat history', history => {
  messagesDiv.innerHTML = '';
  history.forEach(addMessage);
});

// Receive text message
socket.on('chat message', addMessage);

// Receive media message
socket.on('media message', addMessage);

// Send message or media
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  const file = mediaInput.files[0];

  if (file) {
    // Upload media
    const formData = new FormData();
    formData.append('media', file);

    const res = await fetch('/upload', { method: 'POST', body: formData });
    const data = await res.json();

    socket.emit('media message', {
      type: 'media',
      url: data.url,
      originalName: data.originalName,
      mediaType: file.type,
      user: 'Anon', // You can customize
    });

    mediaInput.value = '';
  }

  if (text) {
    socket.emit('chat message', { type: 'text', text, user: 'Anon' });
    input.value = '';
  }
});