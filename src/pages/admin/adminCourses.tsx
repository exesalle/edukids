import React, {FC, useEffect, useState} from 'react';
import AdminMenu from '../../components/AdminMenu';
import {collection, getDocs, addDoc, getFirestore, onSnapshot, doc, query, DocumentData} from 'firebase/firestore';
import {ICoursesData, InitialCourses, InitialTeachers, IUserData} from '../../Types';


const AdminCourses:FC = () => {

  const db = getFirestore();
  const [courseData, setCourseData] = useState<ICoursesData>({
    id: 1,
    name: '',
    teacher: ''
  });

  const [coursesData, setCoursesData] = useState<ICoursesData[]>(InitialCourses);
  const [teachersData, setTeachersData] = useState<IUserData[]>(InitialTeachers);

  const addCourse = async () => {
    try {
      await addDoc(collection(db, 'courses'), {
        id: Date.now(),
        name: courseData.name,
        teacher: courseData.teacher
      });
    } catch (e) {
      console.log(e);
    }
  };


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
            Направления
          </h2>
        </div>
        <input
          type="name"
          value={courseData.name}
          onChange={(e) => setCourseData({...courseData, name: e.target.value})}
          placeholder="Название"
        />
        <button className="title-box" onClick={addCourse}>
          <h2 className="title-text">
            Добавить направление
          </h2>
        </button>

        <table className="table-courses">
          <tr>
            <th>Название</th>
            <th>Преподаватель</th>
          </tr>
          {coursesData.map(el =>
            <tr key={el.id}>
              <td>{el.name}</td>
              <td><select>
                {teachersData.map(el =>
                  <option key={el.id} value="grapefruit">{el.name}</option>
                )}
              </select></td>
              <td><button className="">Редактировать</button></td>
            </tr>)}
        </table>
      </div>
    </>
  );
};

export default AdminCourses;