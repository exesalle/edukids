import React, {useState} from 'react';
import {getAuth, signOut, updateProfile} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom';


export const CurrentUser: React.FC = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const push = useNavigate();

  const handleLogin = () => {
    push('/login');
  };
  const handleLogout = () => {
    signOut(auth);
    push('/login');
  };
  if (loading) {
    return (
      <div>
        <p>Загрузка профиля...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Ошибка: {error.message}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div className="user-status">
        <p>{user.photoURL}</p>
        <p>{user.displayName}</p>
        <p>{user.email}</p>
        {/*<Input addonBefore="username:" type="name" value={username}*/}
        {/*  onChange={(e) => setUserName(e.target.value)} />*/}
        {/*<button onClick={changeusername}>change</button>*/}
        <button className="log-out" onClick={handleLogout}>Выйти</button>
      </div>
    );
  }
  return <button className="log-out" onClick={handleLogin}>Авторизация</button>;
};