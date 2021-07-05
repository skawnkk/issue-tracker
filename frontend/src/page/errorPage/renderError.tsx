import { useState } from 'react';
import ErrorPage from 'page/errorPage/ErrorPage';
import Logout from 'util/Logout';

function RenderError(errorCode: number) {
  console.log(errorCode);
  const [isError, setError] = useState(false);
  if (errorCode === 401) Logout();
  if (errorCode === 404) setError(true);
  return isError && <ErrorPage errorCode={errorCode} />;
}

export default RenderError;
