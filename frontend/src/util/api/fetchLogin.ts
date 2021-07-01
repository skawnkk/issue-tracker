import API, { authorizedHeaders } from 'util/api/api';
const token = localStorage.getItem('token');
export async function fetchLogin(code: string): Promise<any> {
  try {
    const postLoginOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(API.SIGN.LOGIN(code), postLoginOption);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
export async function fetchLogout(): Promise<any> {
  try {
    const response = await fetch(API.SIGN.LOGOUT, {
      headers: authorizedHeaders(token),
    });
    console.log(response);
    // const data = await response.json();
    // return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserInfoUsingJWT() {
  try {
    const response = await fetch(API.SIGN.USER, { headers: authorizedHeaders(token) });
    const userData = await response.json();
    return userData;
  } catch (err) {
    console.log(err);
  }
}
