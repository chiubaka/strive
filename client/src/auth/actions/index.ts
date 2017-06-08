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
  COMPLETE_LOGIN: type<"COMPLETE_LOGIN">("COMPLETE_LOGIN")
}

export type AuthAction = StartLogin | CompleteLogin;

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

export function login(provider: string, accessToken: string) {
  return (dispatch: Dispatch<AuthState>) => {
    dispatch(startLogin());
    return fetch("/api/auth/convert-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=convert_token&client_id=${OAUTH_CLIENT_ID}&client_secret=${OAUTH_CLIENT_SECRET}&backend=${provider}&token=${accessToken}`
    })
      .then(response => response.json())
      .then((response: IConvertTokenResponse) => {
        dispatch(completeLogin(response.access_token, response.expires_in))
      });
  }
}