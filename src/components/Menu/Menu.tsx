import React from 'react';
import {CurrentUser} from '../../state/useAuthState';
import MenuButton from './MenuButton';

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