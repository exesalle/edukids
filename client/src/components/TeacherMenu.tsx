import React from 'react';
import {CurrentUser} from '../state/useAuthState';
import MenuButton from './MenuButton';

const TeacherMenu = () => {
  return (
    <>
      <div className="menu">
        <CurrentUser/>
        <MenuButton title="Мои занятия" handleClick="../teacher/schedule"/>
        <MenuButton title="Мои ученики" handleClick="../teacher/users"/>
        <MenuButton title="Чат" handleClick="../teacher/chat"/>
      </div>
    </>
  );
};
export default TeacherMenu;