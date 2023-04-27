import React from 'react';
import {Link} from 'react-router-dom';

type Props = {
  title: string;
  handleClick: string;
}
const MenuButton = (props: Props) => {
  return (
    <>
      <Link to={props.handleClick}>
        <button className="menu-button">{props.title}</button></Link>
    </>
  );
};

export default MenuButton;