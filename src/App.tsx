import React, {useState} from 'react';
import './App.scss';
import { Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import {LoginPage} from './pages/login';
import {Registration} from './pages/registration';
import AdminCourses from './pages/admin/adminCourses';
import AdminEvents from './pages/admin/adminEvents';
import AdminTeachers from './pages/admin/adminTeachers';
import AdminUsers from './pages/admin/adminUsers';
import AdminChat from './pages/admin/adminChat';
import UserGroup from './pages/user/userGroup';
import UserSchedule from './pages/user/userSchedule';
import UserAchievments from './pages/user/userAchievments';
import TeacherSchedule from './pages/teacher/teacherSchedule';
import TeacherGroup from './pages/teacher/teacherGroup';
import AppContext from './providers/AppContext';
import {iAppState} from './Types';

function App() {

  const [appState, setState] = useState<iAppState>({
    user: null,
    userData: null,
  });
  const [isDetailedChatClicked, setIsDetailedChatClicked] = useState(false);
  const [isCreateChatClicked, setIsCreateChatClicked] = useState(false);
  const [isMeetingClicked, setIsMeetingClicked] = useState(false);

  return (
    <>
      <div className="App">
        <AppContext.Provider value={{
          appState,
          setState,
          setIsCreateChatClicked,
          isCreateChatClicked,
          setIsDetailedChatClicked,
          isDetailedChatClicked,
          isMeetingClicked,
          setIsMeetingClicked,
        }}>
          <Routes>
            <Route index element={<Home/>} />
            <Route path="login" element={<LoginPage/>}/>
            <Route path="registration" element={<Registration/>}/>
            <Route path="admin/courses" element={<AdminCourses/>}/>
            <Route path="admin/events" element={<AdminEvents/>}/>
            <Route path="admin/teachers" element={<AdminTeachers/>}/>
            <Route path="admin/users" element={<AdminUsers/>}/>
            <Route path="admin/groups" element={<AdminChat/>}/>
            <Route path="user/group" element={<UserGroup/>}/>
            <Route path="user/profile" element={<UserSchedule/>}/>
            <Route path="user/achievments" element={<UserAchievments/>}/>
            <Route path="user/schedule" element={<UserSchedule/>}/>
            <Route path="teacher/schedule" element={<TeacherSchedule/>}/>
            <Route path="teacher/groups" element={<TeacherGroup/>}/>
          </Routes>
        </AppContext.Provider>
      </div>
    </>
  );
}

export default App;
