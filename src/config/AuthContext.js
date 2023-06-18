import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function useAuth(){
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const initialUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));

    if (storedToken && initialUserInfo) {
        setUserInfo(initialUserInfo);
    }
  }, []);

  // console.log(userInfo);

  const loginUser = (userData) => {
    // Perform login logic and set isLoggedIn to true
    setIsLoggedIn(true);
    // Set user information
    // setUserInfo(userData);
    setUserInfo(userData);
    sessionStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const logout = () => {
    // Perform logout logic and set isLoggedIn to false
    setIsLoggedIn(false);
    // Reset user information
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider value={{ userInfo, setUserInfo, isLoggedIn, setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
