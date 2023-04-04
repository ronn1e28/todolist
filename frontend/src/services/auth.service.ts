import auth from "../config/firebase";

class AuthService {
  async getToken() {
    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      return token;
    }
  }
}

const AuthServiceObj = new AuthService();

export default AuthServiceObj;
