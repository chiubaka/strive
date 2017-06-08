import { CompleteLogin } from './../actions/index';
import { AuthInnerState, DEFAULT_AUTH_STATE } from './../model/AuthenticationState';
import { AuthState, LoginState } from '../model/AuthenticationState';
import { ActionTypes, AuthAction } from '../actions/index';
import Cookies from '../utils/cookies';

export function auth(state: AuthInnerState = DEFAULT_AUTH_STATE, action: AuthAction) {
  switch(action.type) {
    case ActionTypes.START_LOGIN:
      return {...state, loginState: LoginState.LoggingIn};
    case ActionTypes.COMPLETE_LOGIN:
      const completeLogin = (<CompleteLogin> action);
      Cookies.setAccessToken(completeLogin.accessToken, completeLogin.expires);
      return {...state, loginState: LoginState.LoggedIn, accessToken: completeLogin.accessToken}
    default:
      return state;
  }
}