import React from 'react';
import logo from "../logo.svg";
import MenuButton from "./MenuButton";
import {CurrentUser} from "../state/useAuthState";

const AdminMenu = () => {
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