import API, { authorizedHeaders } from 'util/api/api';

export async function fetchLogin(code: string): Promise<any> {
  try {
    const token = localStorage.getItem('token');
    const postLoginOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authorizedHeaders(token),
      },
    };
    const response = await fetch(API.login(code), postLoginOption);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
