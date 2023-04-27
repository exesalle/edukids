import React from 'react';
import './App.scss';
import { Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import {LoginPage} from './pages/login';
import {Registration} from './pages/registration';
import AdminCourses from './pages/admin/adminCourses';
import AdminEvents from './pages/admin/adminEvents';
import AdminTeachers from './pages/admin/adminTeachers';
import AdminUsers from './pages/admin/adminUsers';
import AdminGroups from './pages/admin/adminGroups';
import AdminChat from './pages/admin/adminChat';
import UserChat from './pages/user/userChat';
import UserSchedule from './pages/user/userSchedule';
import UserEducation from './pages/user/userEducation';
import UserAchievments from './pages/user/userAchievments';
import AdminTimetable from './pages/admin/adminTimetable';

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route index element={<Home/>} />
          <Route path="login" element={<LoginPage/>}/>
          <Route path="registration" element={<Registration/>}/>
          <Route path="admin/timetable" element={<AdminTimetable/>}/>
          <Route path="admin/courses" element={<AdminCourses/>}/>
          <Route path="admin/events" element={<AdminEvents/>}/>
          <Route path="admin/teachers" element={<AdminTeachers/>}/>
          <Route path="admin/users" element={<AdminUsers/>}/>
          <Route path="admin/groups" element={<AdminGroups/>}/>
          <Route path="admin/chat" element={<AdminChat/>}/>
          <Route path="user/chat" element={<UserChat/>}/>
          <Route path="user/profile" element={<UserSchedule/>}/>
          <Route path="user/education" element={<UserEducation/>}/>
          <Route path="user/achievments" element={<UserAchievments/>}/>
          <Route path="user/schedule" element={<UserSchedule/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;