import React, { Suspense, lazy, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header/Header';
import LoginPage from 'page/loginPage/LoginPage';
import { useSetRecoilState } from 'recoil';
import { controlLoginState } from 'store/loginStore';
import { getUserInfoUsingJWT } from 'util/api/fetchLogin';

function App() {
  const MainPage = lazy(() => import('./page/mainPage/MainPage'));
  const CreateIssuePage = lazy(() => import('./page/createIssuePage/CreateIssuePage'));
  const DetailIssuePage = lazy(() => import('./page/detailIssuePage/DetailIssuePage'));
  const LabelPage = lazy(() => import('./page/labelPage/LabelPage'));
  const MilestonePage = lazy(() => import('./page/milestonePage/MilestonePage'));
  const setLoginData = useSetRecoilState(controlLoginState);
  const token = localStorage.getItem('token');
  const isLogin = () => !!token;
  useEffect(() => {
    if (!isLogin()) return;
    try {
      (async () => {
        const userData = await getUserInfoUsingJWT();
        const loginData = {
          avatarUrl: userData.avatarUrl,
          userName: userData.userName,
          name: userData.name,
        };
        setLoginData({ isLogin: true, loginData });
      })();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div className='App'>
      <Router>
        <Header />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route path='/' exact>
              {isLogin() ? <Redirect to='/main' /> : <LoginPage />}
            </Route>
            <Route path='/main'>{isLogin() ? <MainPage /> : <Redirect to='/' />}</Route>
            <Route path='/create'>{isLogin() ? <CreateIssuePage /> : <Redirect to='/' />}</Route>
            <Route path='/detail'>{isLogin() ? <DetailIssuePage /> : <Redirect to='/' />}</Route>
            <Route path='/label'>{isLogin() ? <LabelPage /> : <Redirect to='/' />}</Route>
            <Route path='/milestone'>{isLogin() ? <MilestonePage /> : <Redirect to='/' />}</Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
