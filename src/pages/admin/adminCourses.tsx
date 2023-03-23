import React, {useEffect, useState} from 'react';
import AdminMenu from "../../components/AdminMenu";
import {collection, getDocs, addDoc, getFirestore, onSnapshot} from "firebase/firestore";
import {ICoursesData, InitialCourses} from "../../Types";


const AdminCourses = () => {

  const db = getFirestore()
  const [courseData,setCourseData] = useState<ICoursesData>({
    id: 1,
    name: '',
    teacher: ''
  })

  const [coursesData,setCoursesData] = useState<ICoursesData[]>(InitialCourses)

  const addCourse = async () => {
    try {
    await addDoc(collection(db, "courses"), {
      id: Date.now(),
      name: courseData.name,
      teacher: courseData.teacher
    });
  } catch (e) {
      console.log(e)
    }
  }

 const displayCourses = onSnapshot(collection(db, "courses"), doc => {
   doc.forEach((d: any) => {
     setCoursesData(prev => [...prev, d.data()])
   });
 });


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
        <div className="main-box">
          {coursesData.map(el =>

          <p key={el.id}>{el.name} id:{el.id}</p>)

          }
        </div>
      </div>
    </>
  );
};

export default AdminCourses;