import { createContext } from "react";
import {
  User,
  UserCredential
} from "firebase/auth";

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>(({} as AuthContextType));
export default AuthContext;