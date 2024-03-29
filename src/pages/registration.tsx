import React from 'react';
import {SignUp} from '../components/SignUp';
import { Link } from 'react-router-dom';

const Registration = () => {
  return (
    <>
      <div className="auth">
        <h1>Регистрация</h1>
        <SignUp teacher={false}/>
        <p>
            У вас уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
        <p><Link to="/">Вернуться на главное меню</Link></p>
      </div>
    </>
  );
};

export {Registration};