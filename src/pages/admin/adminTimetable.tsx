import React, {useEffect, useState} from 'react';
import AdminMenu from '../../components/AdminMenu';
import {InitialTeachers, IUserData} from '../../Types';
import {collection, getDocs, getFirestore, query} from 'firebase/firestore';

const AdminTimetable:React.FC = () => {

  const db = getFirestore();
  const [teachersData, setTeachersData] = useState<IUserData[]>(InitialTeachers);

  const displayCollections = async () => {
    const coursesCollection = query(collection(db, 'courses'));
    const teachersCollection = query(collection(db, 'teachers'));
    const coursesSnapshot = await getDocs(coursesCollection);
    const teachersSnapshot = await getDocs(teachersCollection);
    const collections: any[] = [];
    await teachersSnapshot.forEach((doc: any) => {
      collections.push(doc.data());
    });
    setTeachersData(collections);

  };

  useEffect(() => {
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
            Расписание
          </h2>
        </div>
        <table className="table-courses">
          <tr>
            <th>Преподаватель</th>
            {teachersData.map(el =>
              <th key={el.id}>
                <td>{el.name}</td>
                <tr>{el.course}
                </tr>
              </th>)}

          </tr>
          <tr>Понедельник</tr>
          <tr><td>Вторник</td>
            <td>1</td>
            <td>1</td></tr>
          <tr>Среда</tr>
          <tr>Четверг</tr>
          <tr>Пятница</tr>
        </table>
      </div>
    </>
  );
};

export default AdminTimetable;