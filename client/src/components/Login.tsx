import { getAuth} from 'firebase/auth';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import React, {FC, SyntheticEvent, useState} from 'react';
import {IUserInfo} from '../Types';
import {useNavigate} from 'react-router-dom';
import {Button} from 'antd';


const Login:React.FC = () => {
  const [userData,setUserData] = useState<IUserInfo>({
    email: '',
    password: ''
  } as IUserInfo);

  const auth = getAuth();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const push = useNavigate();
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(userData.email, userData.password);
      if (userData.email === 'admin@edukids.com') {push('/admin/courses');}
      else {push('/user/profile');}
    } catch (error:any) {
      console.log(error.message);
    }
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
      <p>{error && <p>{error.message}</p>}</p>
      <Button className="signUp"
        type="primary"
        onClick={() => handleLogin()}>
        ВОЙТИ
      </Button>
    </>
  );
};

export {Login};
