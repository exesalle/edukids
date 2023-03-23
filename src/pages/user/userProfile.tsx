import React from 'react';
import UserMenu from "../../components/UserMenu";

const UserProfile = () => {
  return (
    <>
      <UserMenu/>
      <div className="main-screen">
        <div className="title-box">
          <h2 className="title-text">
            Мой профиль
          </h2>
        </div>
        <div className="main-box">
        </div>
      </div>
    </>
  );
};

export default UserProfile;