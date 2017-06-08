import * as JsCookies from "js-cookie";

export namespace Cookies {
  export const ACCESS_TOKEN_KEY = "accessToken";

  export function setAccessToken(accessToken: string, expires: number) {
    JsCookies.set(ACCESS_TOKEN_KEY, accessToken, { expires });
  }

  export function getAccessToken() {
    return JsCookies.get(ACCESS_TOKEN_KEY);
  }
}

export default Cookies;
