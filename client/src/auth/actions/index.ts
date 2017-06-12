import { OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } from './../../secrets';
import { IConvertTokenResponse } from './../../api';
import { AuthState } from './../model/AuthenticationState';
import { Action, Dispatch } from "redux";

const typeCache: { [label: string]: boolean } = {};

function type<T>(label: T | ""): T {
	if (typeCache[<string>label]) {
		throw new Error(`Action type "${label}" is not unique`);
	}

	typeCache[<string>label] = true;

	return <T>label;
}

export const ActionTypes = {
  START_LOGIN: type<"START_LOGIN">("START_LOGIN"),
  COMPLETE_LOGIN: type<"COMPLETE_LOGIN">("COMPLETE_LOGIN"),
  START_LOGOUT: type<"START_LOGOUT">("START_LOGOUT"),
  COMPLETE_LOGOUT: type<"COMPLETE_LOGOUT">("COMPLETE_LOGOUT")
}

export type AuthAction = StartLogin | CompleteLogin | StartLogout | CompleteLogout;

export interface StartLogin extends Action {};

function startLogin() {
  return {
    type: ActionTypes.START_LOGIN
  }
}

export interface CompleteLogin extends Action {
  accessToken: string;
  expires: number;
}

function completeLogin(accessToken: string, expires: number) {
  return {
    type: ActionTypes.COMPLETE_LOGIN,
    accessToken,
    expires
  };
}

export interface StartLogout extends Action {};

function startLogout() {
  return {
    type: ActionTypes.START_LOGOUT
  };
}

export interface CompleteLogout extends Action {};

function completeLogout() {
  return {
    type: ActionTypes.COMPLETE_LOGOUT
  };
}

export function login(provider: string, accessToken: string) {
  return (dispatch: Dispatch<AuthState>) => {
    dispatch(startLogin());
    return fetch("/api/auth/convert-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      // TODO: Need to check, but probably not OK to be storing the OAUTH_CLIENT_SECRET in client-accessible code. Otherwise,
      // an attacker could pull the OAUTH_CLIENT_SECRET from minified JS and masquerade as a client. This request is probably
      // meant to be made server-to-server.
      body: `grant_type=convert_token&client_id=${OAUTH_CLIENT_ID}&client_secret=${OAUTH_CLIENT_SECRET}&backend=${provider}&token=${accessToken}`
    })
      .then(response => response.json())
      .then((response: IConvertTokenResponse) => {
        dispatch(completeLogin(response.access_token, response.expires_in))
      });
  }
}

export function logout(accessToken: string) {
  return (dispatch: Dispatch<AuthState>) => {
    dispatch(startLogout());
    return fetch("/api/auth/revoke-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `client_id=${OAUTH_CLIENT_ID}&client_secret=${OAUTH_CLIENT_SECRET}&token=${accessToken}`
    })
      .then(() => {
        dispatch(completeLogout());
      });
  }
}