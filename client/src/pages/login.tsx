import React from 'react';
import {Login} from '../components/Login';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
      <div className="auth">
        <h1>Вход</h1>
        <Login/>
        <p>Нет аккаунта?<Link to="/registration">Зарегистрируйтесь</Link></p>
      </div>
    </>
  );
};

export {LoginPage};