import React, {FC} from 'react';
import MenuButton from './MenuButton';
import {CurrentUser} from '../state/useAuthState';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';

const UserMenu:FC = () => {
  const [user] = useAuthState(auth);
  const push = useNavigate();
  if (!user?.displayName?.includes('user')) {
    push('/login');
  }


  return (
    <>
      <div className="menu">
        <CurrentUser/>
        <MenuButton title="Главное меню" handleClick="../"/>
        <MenuButton title="Мое обучение" handleClick="../user/schedule"/>
        <MenuButton title="Достижения" handleClick="../user/achievments"/>
        <MenuButton title="Группы" handleClick="../user/group"/>

      </div>
    </>
  );
};

export default UserMenu;