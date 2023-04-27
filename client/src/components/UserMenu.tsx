import React, {FC} from 'react';
import logo from '../logo.svg';
import MenuButton from './MenuButton';
import {CurrentUser} from '../state/useAuthState';

const UserMenu:FC = () => {
  
  return (
    <>
      <div className="menu">
        <CurrentUser/>
        <MenuButton title="Главное меню" handleClick="../"/>
        <MenuButton title="Мое обучение" handleClick="../user/schedule"/>
        <MenuButton title="Достижения" handleClick="../user/achievments"/>
        <MenuButton title="Чат" handleClick="../user/chat"/>

      </div>
    </>
  );
};

export default UserMenu;