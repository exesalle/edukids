import React from 'react';
import MenuButton from './MenuButton';
import {CurrentUser} from '../state/useAuthState';

const Menu = () => {
  return (
    <>
      <div className="menu">
        <CurrentUser/>
        <MenuButton title="Направления" handleClick="../courses"/>
        <MenuButton title="Поддержка" handleClick="../chat"/>
      </div>
    </>
  );
};
export default Menu;