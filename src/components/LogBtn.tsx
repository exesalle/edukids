import {Navigate, useNavigate} from 'react-router-dom';
import React from 'react';
import {useDispatch} from 'react-redux';
import {Button} from 'antd';
import {auth} from '../firebase';
import {signOut} from 'firebase/auth';

const LogBtn = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate('login');
  };
  const navigateToRegistration = () => {
    navigate('registration');
  };
  const navigateToAccount = () => {
    if (user?.displayName) {
      if (user.displayName.includes('user')) {
        navigate('user/schedule');
      } else if (user.displayName.includes('teacher')) {
        navigate('teacher/schedule');
      } else if (user.displayName.includes('admin')) {
        navigate('teacher/schedule');}
    }
  };

  const handleLogout = () => {
    signOut(auth);
    navigate('/login');
  };




  return (user) ? (
    <>
      <div>
        <Button className="signUp" onClick={navigateToAccount}>
          <img alt="lk" height={35} width={35} src="/img/lk.png"/>
        </Button>
        <Button className="signUp" onClick={handleLogout}>
          <h4 style={{color: '#232323'}}>ВЫЙТИ ИЗ {user.email}</h4></Button>
      </div>
    </>

  ) : (
    <div className="headerRight">
      <Button className="signUp" onClick={navigateToRegistration}>
        <h4 style={{color: '#232323'}}>РЕГИСТРАЦИЯ</h4>
      </Button>

      <Button className="signUp" onClick={navigateToLogin}>
        <h4 style={{color: '#232323'}}>ВХОД</h4>
      </Button>

    </div>
  );


};

export {LogBtn};