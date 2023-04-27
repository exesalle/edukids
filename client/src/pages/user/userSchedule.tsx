import React from 'react';
import Schedule from '../../components/schedule/Schedule';
import UserMenu from '../../components/UserMenu';

const UserSchedule = () => {
  return (
    <>      <UserMenu/>
      <div className="main-screen">
        <Schedule/>
      </div>

    </>
  );
};

export default UserSchedule;