import React, {FC, useEffect, useState} from 'react';
import AdminMenu from '../../components/AdminMenu';
import {ICoursesData} from '../../Types';
import {asyncGetTeachers} from '../../store/teacherReducer';
import {asyncAddCourse, asyncDeleteCourse, asyncGetCourses, asyncUpdateCourse} from '../../store/courseReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/store';
import {Button, Dropdown, Input, Modal, Select, Space} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const AdminCourses:FC = () => {

  const [courseData, setCourseData] = useState({
    name: '',
    teacher: ''
  });
  const [editData, setEditData] = useState({
    id: 1,
    name: '',
    teacher: ''
  });

  const dispatch = useDispatch();
  const teachers = useSelector((state:RootState)=> state.TeacherReducer.teachers);
  const courses = useSelector((state:RootState)=> state.CourseReducer.courses);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(asyncGetCourses());
      dispatch(asyncGetTeachers());
    };
  }, []);

  const showModal = (id: number, name: string, teacher: string) => {
    setIsModalOpen(true);
    setEditData({id: id, name: name, teacher: teacher});
  };

  const handleOk = () => {
    dispatch(asyncUpdateCourse(editData.id, editData.name, editData.teacher));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOnChangeEdit = (value:string) => {
    setEditData({...editData, teacher: value});
  };

  const handleOnChangeAdd = (value:string) => {
    setCourseData({...courseData, teacher: value});
  };

  const addCourse = () => {
    dispatch(asyncAddCourse(courseData.name, courseData.teacher));
    setCourseData({...courseData, name: ''});
  };

  return (
    <>
      <AdminMenu/>
      <div className="main-screen">
        <div className="input-course">
          <Input placeholder="Название" type="name" value={courseData.name}
            onChange={(e) => setCourseData({...courseData, name: e.target.value})} />
          <Select placeholder="Преподаватель"  style={{ width: 600 }} onSelect={(value) => handleOnChangeAdd(value)} >
            {teachers.map(el =>
              <Select.Option value={el.name} key={el.id} >{el.name}</Select.Option >
            )}
          </Select>
          <Button type="primary" onClick={addCourse}>Добавить направление</Button>
        </div>
        <table className="table-courses">
          <tr>
            <th>Название</th>
            <th>Преподаватель</th>
            <th>Редактировать</th>
            <th>Удалить</th>
          </tr>
          {courses.map((el) =>
            <tr key={el.id}>
              <td>{el.name}</td>
              <td>{el.teacher}</td>
              <td><Button type="primary" icon={<EditOutlined />} onClick={() => showModal(el.id,el.name,el.teacher)} size="large" /></td>
              <td><Button type="primary" icon={<DeleteOutlined />} onClick={() => dispatch(asyncDeleteCourse(el.id))} size="large"  danger/></td>
            </tr>)}
          <Modal title="Редактировать" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Input addonBefore="Название:" type="name" value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})} />
            <Select  value={editData.teacher} onSelect={(value) => handleOnChangeEdit(value)} >
              {teachers.map(el =>
                <Select.Option value={el.name} key={el.id} >{el.name}</Select.Option >
              )}
            </Select>
          </Modal>
        </table>
      </div>
    </>
  );
};

export default AdminCourses;