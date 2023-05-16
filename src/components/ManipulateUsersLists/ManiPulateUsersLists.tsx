import React, { useContext, useState } from 'react';
import uuid from 'react-uuid';
import {IUserInfo, UsersListProps} from '../../Types';
import UserComponent from '../User/User';
import './ManiPulateUsersLists.scss';
import {UserAddOutlined} from '@ant-design/icons';

import {auth} from '../../firebase';
import {Button} from 'antd';

const ManiPulateUsersLists = ({ leftSide, setLeftSide, rightSide, setRightSide }: UsersListProps): JSX.Element => {
  const [searchTermLeft, setSearchTermLeft] = useState<string>('');
  const [searchTermRight, setSearchTermRight] = useState<string>('');
  const user = auth.currentUser;
  const currentUser = user?.displayName;


  const getUsersBySearchTerm = (searchTerm: string, users: IUserInfo[]) => {

    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm));
  };

  const leftResult = getUsersBySearchTerm(searchTermLeft, leftSide);
  const rightResult = getUsersBySearchTerm(searchTermRight, rightSide);

  const handleAddUser = (user: IUserInfo): void => {
    setRightSide([
      ...rightSide,
      user,
    ]);

    setLeftSide(leftSide.filter((u) => u.id !== user.id));
  };

  const handleRemoveUser = (user: IUserInfo): void => {
    setRightSide(rightSide.filter((u) => u.id !== user.id));

    setLeftSide([
      ...leftSide,
      user,
    ]);
  };

  const mappingUserAddButton = (user: IUserInfo): JSX.Element | undefined => {
    const buttonEl: JSX.Element =
      <Button icon={<UserAddOutlined />} onClick={() => {
        handleAddUser(user);
      }} id="add-remove-user-btn">добавить
        {/*<img src={Add} alt="add-btn" />*/}
      </Button>;
    if (user.username !== currentUser) {
      return <div key={uuid()}>
        <UserComponent props={{ user, buttonEl }} />
      </div>;
    }
  };

  const mappingUserRemoveButton = (user: IUserInfo): JSX.Element | undefined => {
    const buttonEl: JSX.Element =
      <button onClick={() => {
        handleRemoveUser(user);
      }} id="add-remove-user-btn"> удалить
        {/*<img src={Delete} alt="remove-btn" />*/}
      </button>;
    if (user.username !== currentUser) {
      return <div key={uuid()}>
        <UserComponent props={{ user, buttonEl }} />
      </div>;
    }
  };

  return (
    <div className="create-group-view">
      <div className="create-group-wrapper">
        <div id="create-group-form" >
          <p>Все пользователи:</p>
          <input type="text" defaultValue="" placeholder="Поиск..." onChange={(event) => setSearchTermLeft(event.target.value)} />
        </div>
        <div className="users-container">
          {searchTermLeft ?
            leftResult.length > 0 ?
              leftResult.map(mappingUserAddButton) :
              <p>Не найдено</p> :
            leftSide.map(mappingUserAddButton)
          }
        </div>
      </div >

      <div className="list-of-added-participants">
        <p>Состав группы:</p>
        <input type="text" defaultValue="" placeholder="Поиск..." onChange={(event) => setSearchTermRight(event.target.value)} />
        <div className="users-container-added">
          {searchTermRight ?
            rightResult.length > 0 ?
              rightResult.map(mappingUserRemoveButton) :
              <p>Не найдено</p> :
            rightSide.map(mappingUserRemoveButton)
          }
        </div>
      </div>

    </div>
  );
};

export default ManiPulateUsersLists;
