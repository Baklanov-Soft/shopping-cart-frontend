const initialLoginState: LoginState = {
  username: ''
};

interface LoginState {
  username: string;
}

type LoginAction =
  | {
      type: LoginActionKind.USER_FOUND;
      payload: { username: string };
    }
  | {
      type: LoginActionKind.USER_NOT_FOUND;
    };

enum LoginActionKind {
  USER_FOUND = 'USER_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND'
}

function userFound(username: string): LoginAction {
  return { type: LoginActionKind.USER_FOUND, payload: { username } };
}

function userNotFound(): LoginAction {
  return { type: LoginActionKind.USER_NOT_FOUND };
}

function loginReducer(_: LoginState, action: LoginAction) {
  switch (action.type) {
    case LoginActionKind.USER_FOUND:
      return { username: action.payload.username };

    case LoginActionKind.USER_NOT_FOUND:
      return { username: '' };
  }
}

export { loginReducer, initialLoginState, userFound, userNotFound };
export type { LoginState, LoginAction };
