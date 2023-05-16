import React from 'react';
import TeacherMenu from '../../components/Menu/TeacherMenu';
import Schedule from '../../components/Schedule/Schedule';

const TeacherSchedule = () => {
  return (
    <>
      <TeacherMenu/>
      <div className="main-screen">
        <Schedule/>
      </div>
    </>
  );
};

export default TeacherSchedule;