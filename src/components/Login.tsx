import { getAuth} from 'firebase/auth';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';
import React, {FC, SyntheticEvent, useState} from "react";
import {IUserData} from "../Types";
import {useNavigate} from "react-router-dom";

const Login:FC = () => {
  const [userData,setUserData] = useState<IUserData>({
    email: '',
    password: ''
  } as IUserData)

  const auth = getAuth();

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const push = useNavigate()
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(userData.email, userData.password)
      && push('/user/profile')
    } catch (error:any) {
      console.log(error.message)
    }
  }

  return (
    <>
    <input
      type="email"
      value={userData.email}
      onChange={(e) => setUserData({...userData, email: e.target.value})}
      placeholder="Email"
    />
    <input
      type="password"
      value={userData.password}
      onChange={(e) => setUserData({...userData, password: e.target.value})}
      placeholder="Пароль"
    />
    <p>{error && <p>{error.message}</p>}</p>
      <button className="signUp"
        onClick={() => handleLogin()}>
        ВОЙТИ
      </button>
    </>
  );
};

export {Login}
