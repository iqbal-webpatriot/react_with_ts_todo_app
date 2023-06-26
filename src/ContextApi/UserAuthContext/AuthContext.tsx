import React, { createContext, useState, ReactNode } from 'react';

export type AuthContextType = {
  user_Id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
  gender: string;
  token: string;
  profile_pic: string | null;
};

type AuthContextValueType = {
  loggedUser: AuthContextType | undefined;
  updateUser: (userInfo: AuthContextType) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValueType >({} as AuthContextValueType);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loggedUser, setLoggedUserInfo] = useState<AuthContextType | undefined>(undefined);
   console.log('auth context value',loggedUser)
  const updateUser = (userInfo: AuthContextType) => {
    setLoggedUserInfo(userInfo);
  };

  const logout = () => {
    setLoggedUserInfo(undefined);
  };

  const authContextValue: AuthContextValueType = {
    loggedUser,
    updateUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
