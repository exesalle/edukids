import React from 'react';
import AdminMenu from '../../components/AdminMenu';

const AdminTeachers = () => {
  return (
    <>
      <AdminMenu/>
      <div className="main-screen">
        <div className="title-box">
          <h2 className="title-text">
            Преподаватели
          </h2>
        </div>
        <div className="main-box">
        </div>
      </div>
    </>
  );
};

export default AdminTeachers;