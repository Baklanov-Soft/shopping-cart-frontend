import { createContext, Dispatch, useContext, useReducer } from 'react';
import {
  initialLoginState,
  LoginAction,
  loginReducer,
  LoginState
} from './login-reducer';

interface LoginContextType {
  state: LoginState;
  dispatch: Dispatch<LoginAction>;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

interface LoginProvider {
  children: React.ReactNode;
}

function LoginProvider({ children }: LoginProvider) {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);
  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
}

function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }
  return context;
}

export { LoginContext, LoginProvider, useLoginContext };
