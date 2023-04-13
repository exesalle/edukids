import React, {FC, useEffect, useState} from 'react';
import AdminMenu from '../../components/AdminMenu';
import {SignUp} from '../../components/SignUp';
import {ICoursesData, InitialCourses, InitialTeachers, IUserData} from '../../Types';
import {collection, getDocs, getFirestore, query} from 'firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {stat} from 'fs';
import {RootState} from '../../store/store';
import {asyncGetTeachers, getTeachers} from '../../store/teacherReducer';

const AdminTeachers:React.FC = () => {


  const db = getFirestore();
  const [teachersData, setTeachersData] = useState<IUserData[]>(InitialTeachers);
  const teachers = useSelector((state:RootState)=> state.TeacherReducer.teachers);
  const dispatch = useDispatch();


  useEffect(() => {
    return () => {
      dispatch(asyncGetTeachers());
    };
  }, []);

  return (
    <>
      <AdminMenu/>
      <div className="main-screen">
        <div className="title-box">
          <h2 className="title-text">
            Преподаватели
          </h2>

        </div>
        <div className="auth">
          <SignUp teacher/>
        </div>

        <table className="table-courses">
          <tr>
            <th>Преподаватель</th>
            <th>Направление</th>
          </tr>
          {teachers.map(el =>
            <tr key={el.id}>
              <td>{el.name}</td>
              <td>{el.course}</td>
              <td><button className="">Сохранить</button></td>
            </tr>)}
        </table>
      </div>
    </>
  );
};

export default AdminTeachers;