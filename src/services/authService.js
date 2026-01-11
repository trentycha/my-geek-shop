const TOKEN_KEY = 'geek_shop_token';
const USER_KEY = 'geek_shop_user';
const USER_ID_KEY = 'userId';

const authService = {
  setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(USER_ID_KEY, user.id);
  },

  getUser() {
    const userStr = localStorage.getItem(USER_KEY);
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Erreur lors du parsing de user:', error);
      return null;
    }
  },

  getUserId() {
    return localStorage.getItem(USER_ID_KEY);
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_ID_KEY);
  },

  getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }
};

export default authService;