import React, {useState} from 'react';
import {IUserInfo} from '../Types';
import {useNavigate} from 'react-router-dom';
import {Button} from 'antd';
import {useStoreDispatch} from '../store/store';
import {signInUser} from '../store/signInSlice';

type Props = {
    teacher: boolean
}
const Login:React.FC<Props> = (props) => {
  const [userData,setUserData] = useState<IUserInfo>({} as IUserInfo);
  const dispatch = useStoreDispatch();

  const push = useNavigate();
  const handleLogin = () => {
    dispatch(signInUser(userData, push, props.teacher));
  };

  return (
    <>
      <input
        className="input"
        type="email"
        value={userData.email}
        onChange={(e) => setUserData({...userData, email: e.target.value})}
        placeholder="Email"
      />
      <input
        className="input"
        type="password"
        value={userData.password}
        onChange={(e) => setUserData({...userData, password: e.target.value})}
        placeholder="Пароль"
      />
      {/*<p>{error && <p>{error.message}</p>}</p>*/}
      <Button className="signUp"
        type="primary"
        onClick={() => handleLogin()}>
        ВОЙТИ
      </Button>
    </>
  );
};

export {Login};
