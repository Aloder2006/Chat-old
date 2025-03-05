// Main Application Logic
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const loginScreen = document.getElementById('login-screen');
  const chatScreen = document.getElementById('chat-screen');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');
  const messageInput = document.getElementById('message-input');
  const sendMessageBtn = document.getElementById('send-message-btn');
  const messagesContainer = document.getElementById('messages-container');
  const userList = document.getElementById('user-list');
  
  // Authentication Check
  function checkAuthentication() {
    if (AuthService.isAuthenticated()) {
      showChatScreen();
    } else {
      showLoginScreen();
    }
  }
  
  // Show Login Screen
  function showLoginScreen() {
    loginScreen.classList.add('active');
    chatScreen.classList.remove('active');
  }
  
  // Show Chat Screen
  function showChatScreen() {
    const currentUser = AuthService.getCurrentUser();
    
    if (currentUser) {
      // Add current user to online users
      ChatService.addOnlineUser(currentUser);
      
      // Update user list
      updateUserList();
      
      // Load previous messages
      loadMessages();
      
      loginScreen.classList.remove('active');
      chatScreen.classList.add('active');
    }
  }
  
  // Update Online Users List
  function updateUserList() {
    const onlineUsers = ChatService.getOnlineUsers();
    userList.innerHTML = onlineUsers.map(user =>
      `<li>${user.displayName}</li>`
    ).join('');
  }
  
  // Load Messages
  function loadMessages() {
    const messages = ChatService.getMessages();
    const currentUser = AuthService.getCurrentUser();
    
    messagesContainer.innerHTML = messages.map(msg => `
            <div class="message ${msg.userId === currentUser.id ? 'sent' : 'received'}">
                <strong>${msg.username}</strong>
                <p>${msg.text}</p>
                <small>${new Date(msg.timestamp).toLocaleString()}</small>
            </div>
        `).join('');
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Send Message
  function sendMessage() {
    const messageText = messageInput.value.trim();
    if (!messageText) return;
    
    const currentUser = AuthService.getCurrentUser();
    const message = {
      id: Date.now(),
      userId: currentUser.id,
      username: currentUser.displayName,
      text: messageText,
      timestamp: new Date().toISOString()
    };
    
    // Save message
    ChatService.saveMessage(message);
    
    // Clear input
    messageInput.value = '';
    
    // Reload messages
    loadMessages();
  }
  
  // Event Listeners
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (AuthService.login(username, password)) {
      checkAuthentication();
    } else {
      loginError.textContent = 'Invalid username or password';
    }
  });
  
  logoutBtn.addEventListener('click', () => {
    const currentUser = AuthService.getCurrentUser();
    
    // Remove user from online users
    ChatService.removeOnlineUser(currentUser.id);
    
    // Logout
    AuthService.logout();
    checkAuthentication();
  });
  
  sendMessageBtn.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Initial Authentication Check
  checkAuthentication();
});