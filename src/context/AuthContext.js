import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  useEffect(() => {
    if (userId) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    }
  }, [userId, userName]);

  return (
    <AuthContext.Provider value={{ userId, setUserId, userName, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);