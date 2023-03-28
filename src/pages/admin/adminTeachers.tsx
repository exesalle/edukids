import React, {FC, useEffect, useState} from 'react';
import AdminMenu from '../../components/AdminMenu';
import {SignUp} from '../../components/SignUp';
import {ICoursesData, InitialCourses, InitialTeachers, IUserData} from '../../Types';
import {collection, getDocs, getFirestore, query} from 'firebase/firestore';

const AdminTeachers:FC = () => {

  const db = getFirestore();
  const [coursesData, setCoursesData] = useState<ICoursesData[]>(InitialCourses);
  const [teachersData, setTeachersData] = useState<IUserData[]>(InitialTeachers);

  useEffect(() => {
    const displayCollections = async () => {
      const coursesCollection = query(collection(db, 'courses'));
      const teachersCollection = query(collection(db, 'teachers'));
      const coursesSnapshot = await getDocs(coursesCollection);
      const teachersSnapshot = await getDocs(teachersCollection);
      await coursesSnapshot.forEach((doc:any) => {
        setCoursesData(prev => [...prev, doc.data()]);
      });
      await teachersSnapshot.forEach((doc:any) => {
        setTeachersData(prev => [...prev, doc.data()]);
      });
    };
    return () => {
      displayCollections();
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
          {teachersData.map(el =>
            <tr key={el.id}>
              <td>{el.name}</td>
              <td><select>
                {coursesData.map(el =>
                  <option key={el.id}>{el.name}</option>
                )}
              </select></td>
              <td><button className="">Сохранить</button></td>
            </tr>)}
        </table>
      </div>
    </>
  );
};

export default AdminTeachers;