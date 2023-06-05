import React from 'react';
import Schedule from '../../components/Schedule/Schedule';
import UserMenu from '../../components/Menu/UserMenu';
const UserSchedule = () => {

  return (
    <>
      <UserMenu/>
      <div className="main-screen">
        <Schedule/>
      </div>
    </>
  );
};

export default UserSchedule;