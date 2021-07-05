import { useHistory } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { controlLoginState } from 'store/loginStore';
import { fetchLogOut } from 'util/api/fetchLogin';
async function Logout() {
  const history = useHistory();
  const resetLoginState = useResetRecoilState(controlLoginState);

  const logoutStatus = await fetchLogOut();
  if (logoutStatus) {
    localStorage.clear();
    resetLoginState();
    history.push('/');
  }
}
export default Logout;
