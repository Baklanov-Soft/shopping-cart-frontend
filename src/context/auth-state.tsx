import React, { createContext, useContext, useState } from 'react';

interface AuthStateContextType {
  loggedIn: boolean;
  setLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
}
const AuthStateContext = createContext<AuthStateContextType>({
  loggedIn: false,
  setLoggedIn: undefined
});

type AuthStateProviderProps = React.PropsWithChildren<{
  loggedIn: boolean;
}>;

function AuthStateProvider({
  loggedIn: initialState,
  children
}: AuthStateProviderProps) {
  const [loggedIn, setLoggedIn] = useState(initialState);
  return (
    <AuthStateContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthStateContext.Provider>
  );
}

function useAuthState() {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthStateContext');
  }
  return context;
}

export { AuthStateProvider, useAuthState };
