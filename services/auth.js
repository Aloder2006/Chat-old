// Authentication Service
const AUTH_KEY = 'chat_user';

const users = [
    { 
        id: 1, 
        username: 'john_doe', 
        password: 'password123', 
        displayName: 'John Doe' 
    },
    { 
        id: 2, 
        username: 'jane_smith', 
        password: 'password123', 
        displayName: 'Jane Smith' 
    }
];

class AuthService {
    static login(username, password) {
        const user = users.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            // Store user in local storage
            localStorage.setItem(AUTH_KEY, JSON.stringify({
                id: user.id,
                username: user.username,
                displayName: user.displayName
            }));
            return true;
        }
        return false;
    }

    static logout() {
        localStorage.removeItem(AUTH_KEY);
    }

    static getCurrentUser() {
        const userJson = localStorage.getItem(AUTH_KEY);
        return userJson ? JSON.parse(userJson) : null;
    }

    static isAuthenticated() {
        return !!localStorage.getItem(AUTH_KEY);
    }
}