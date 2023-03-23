import React from 'react';
import logo from "../logo.svg";
import MenuButton from "./MenuButton";
import {CurrentUser} from "../state/useAuthState";

const Menu = () => {
  return (
    <>
      <div className="menu">
        <img src={logo} className="App-logo" alt="logo" />
        <MenuButton title="Направления" handleClick="../courses"/>
        <MenuButton title="Поддержка" handleClick="../chat"/>
        <CurrentUser/>
      </div>
    </>
  );
};

export default Menu;