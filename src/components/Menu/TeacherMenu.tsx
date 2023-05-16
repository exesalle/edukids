import React from 'react';
import {CurrentUser} from '../../state/useAuthState';
import MenuButton from './MenuButton';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth} from '../../firebase';
import {useNavigate} from 'react-router-dom';

const TeacherMenu = () => {
  const [user] = useAuthState(auth);
  const push = useNavigate();
  if (!user?.displayName?.includes('teacher')) {
    push('/login');
  }
  return (
    <>
      <div className="menu">
        <CurrentUser/>
        <MenuButton title="Мои занятия" handleClick="../teacher/schedule"/>
        <MenuButton title="Группы" handleClick="../teacher/groups"/>
      </div>
    </>
  );
};
export default TeacherMenu;