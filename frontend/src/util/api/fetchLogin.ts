import API, { authorizedHeaders } from 'util/api/api';
const token = localStorage.getItem('token');
export async function fetchLogin(code: string): Promise<any> {
  try {
    const postLoginOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authorizedHeaders(token),
      },
    };
    const response = await fetch(API.LOGIN.ACCESS(code), postLoginOption);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserInfoUsingJWT() {
  try {
    const response = await fetch(API.LOGIN.USER, { headers: authorizedHeaders(token) });
    const userData = await response.json();
    return userData;
  } catch (err) {
    console.log(err);
  }
}
