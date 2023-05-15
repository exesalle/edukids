import React, {FC} from 'react';
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
        <CurrentUser/>
        <MenuButton title="Кружки" handleClick="../admin/courses"/>
        <MenuButton title="Мероприятия" handleClick="../admin/events"/>
        <MenuButton title="Преподаватели" handleClick="../admin/teachers"/>
        <MenuButton title="Пользователи" handleClick="../admin/users"/>
        <MenuButton title="Группы" handleClick="../admin/groups"/>
      </div>
    </>
  );
};

export default AdminMenu;