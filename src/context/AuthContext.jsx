import { createContext, useEffect, useState } from "react";
import {
  getUserFromStorage,
  getUsersFromStorage,
  removeUserFromStorage,
  saveUsersToStorage,
  saveUserToStorage,
} from "../utils/storage";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentuser, setCurrentuser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storage = getUserFromStorage();
    if (storage) setCurrentuser(storage);
  }, []);

  const registeruser = (userData) => {
    setError(null);

    const usersexist = getUsersFromStorage();
    const userexisting = usersexist.some((u) => u.email === userData.email);
    if (userexisting) {
      setError("Email déjà utilisé");
      return false;
    }

    const newuser = {
      ...userData,
      id: Date.now(),
    };
    usersexist.push(newuser);
    saveUsersToStorage(usersexist);
    setCurrentuser(newuser);
    saveUserToStorage(newuser);
    return true;
  };

  const loginuser = (email, password) => {
    setError(null);

    const usersexist = getUsersFromStorage();
    const userconnect = usersexist.find(
      (u) => u.email === email && u.password === password
    );
    if (!userconnect) {
      setError("Email ou mot de passe incorrect");
      return false;
    }

    setCurrentuser(userconnect);
    saveUserToStorage(userconnect);
    return true;
  };

  const logout = () => {
    setCurrentuser(null);
    removeUserFromStorage();
  };

  return (
    <AuthContext.Provider
      value={{ currentuser, error, loginuser, registeruser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};