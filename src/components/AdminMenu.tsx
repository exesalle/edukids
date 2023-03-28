import React, {FC} from 'react';
import logo from '../logo.svg';
import MenuButton from './MenuButton';
import {CurrentUser} from '../state/useAuthState';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../firebase';
import {useNavigate} from 'react-router-dom';

const AdminMenu:FC = () => {
  const [user] = useAuthState(auth);
  const push = useNavigate();
  if (user?.email !== 'admin@edukids.com') {
    push('/login');
  }
  return (
    <>
      <div className="menu">
        <img src={logo} className="App-logo" alt="logo" />
        <MenuButton title="Направления" handleClick="../admin/courses"/>
        <MenuButton title="Мероприятия" handleClick="../admin/events"/>
        <MenuButton title="Группы" handleClick="../admin/groups"/>
        <MenuButton title="Преподаватели" handleClick="../admin/teachers"/>
        <MenuButton title="Пользователи" handleClick="../admin/users"/>
        <MenuButton title="Чат" handleClick="../admin/chat"/>
        <CurrentUser/>
      </div>
    </>
  );
};

export default AdminMenu;