// Chat Service
class ChatService {
    static STORAGE_KEY = 'chat_messages';
    static USERS_KEY = 'online_users';

    // Store messages in local storage
    static saveMessage(message) {
        const messages = this.getMessages();
        messages.push(message);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(messages));
    }

    // Retrieve messages from local storage
    static getMessages() {
        const messagesJson = localStorage.getItem(this.STORAGE_KEY);
        return messagesJson ? JSON.parse(messagesJson) : [];
    }

    // Add online user
    static addOnlineUser(user) {
        const users = this.getOnlineUsers();
        if (!users.some(u => u.id === user.id)) {
            users.push(user);
            localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
        }
    }

    // Get online users
    static getOnlineUsers() {
        const usersJson = localStorage.getItem(this.USERS_KEY);
        return usersJson ? JSON.parse(usersJson) : [];
    }

    // Remove online user
    static removeOnlineUser(userId) {
        const users = this.getOnlineUsers()
            .filter(user => user.id !== userId);
        localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    }

    // Clear messages (optional)
    static clearMessages() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}