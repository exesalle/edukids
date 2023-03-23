import React, {FC} from 'react';
import logo from '../logo.svg';
import MenuButton from './MenuButton';
import {CurrentUser} from '../state/useAuthState';

const UserMenu:FC = () => {
  
  return (
    <>
      <div className="menu">
        <img src={logo} className="App-logo" alt="logo" />
        <MenuButton title="Профиль" handleClick="../user/profile"/>
        <MenuButton title="Мое обучение" handleClick="../user/education"/>
        <MenuButton title="Достижения" handleClick="../user/achievments"/>
        <MenuButton title="Чат" handleClick="../user/chat"/>
        <CurrentUser/>
      </div>
    </>
  );
};

export default UserMenu;