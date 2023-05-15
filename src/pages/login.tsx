import React from 'react';
import {Login} from '../components/Login';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <>
      <div className="auth">
        <h1>Вход</h1>
        <Login teacher={false}/>
        <p>Нет аккаунта?<Link to="/registration">Зарегистрируйтесь</Link></p>
        <p><Link to="/">Вернуться на главное меню</Link></p>
      </div>
    </>
  );
};

export {LoginPage};