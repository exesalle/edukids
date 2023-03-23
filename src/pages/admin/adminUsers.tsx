import React from 'react';
import AdminMenu from '../../components/AdminMenu';

const AdminUsers = () => {
  return (
    <>
      <AdminMenu/>
      <div className="main-screen">
        <div className="title-box">
          <h2 className="title-text">
            Пользователи
          </h2>
        </div>
        <div className="main-box">
        </div>
      </div>
    </>
  );
};

export default AdminUsers;