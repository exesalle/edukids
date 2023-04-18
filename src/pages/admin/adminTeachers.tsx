import React, {FC, useEffect, useState} from 'react';
import AdminMenu from '../../components/AdminMenu';
import {useSelector} from 'react-redux';
import {RootState, useStoreDispatch} from '../../store/store';
import {addCourse, getCourses, removeCourse, updateCourse} from '../../store/coursesSlice';
import {Button, Input, Modal, Select} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';

import {getTeachers} from '../../store/teachersSlice';
import {SignUp} from '../../components/SignUp';

const AdminTeachers:React.FC = () => {

  const [courseData, setCourseData] = useState({
    name: '',
    teacher: ''
  });
  const [editData, setEditData] = useState({
    id: 1,
    name: '',
    teacher: ''
  });
  const dispatch = useStoreDispatch();
  const teachers = useSelector((state:RootState)=> state.teachers.teachers);
  const courses = useSelector((state:RootState)=> state.courses.courses);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(getCourses());
      dispatch(getTeachers());
    };
  }, [dispatch]);

  const showModal = (id: number, name: string, teacher: string) => {
    setIsModalOpen(true);
    setEditData({id: id, name: name, teacher: teacher});
  };

  const handleOk = () => {
    dispatch(updateCourse(editData));
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

  const handleaddCourse = () => {
    dispatch(addCourse({id: Date.now(), name:courseData.name, teacher:courseData.teacher}));
    setCourseData({...courseData, name: ''});
  };

  return (
    <>
      <AdminMenu/>
      <div className="main-screen">
        <div className="auth">
          <SignUp teacher/>
        </div>
        <div className="input-course">
          <Input placeholder="Название" type="name" value={courseData.name}
            onChange={(e) => setCourseData({...courseData, name: e.target.value})} />
          <Select placeholder="Преподаватель"  style={{ width: 600 }} onSelect={(value) => handleOnChangeAdd(value)} >
            {teachers.map(el =>
              <Select.Option value={el.name} key={el.id} >{el.name}</Select.Option >
            )}
          </Select>
          <Button type="primary" onClick={handleaddCourse}>Добавить направление</Button>
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
              <td><Button type="primary" icon={<DeleteOutlined />} onClick={() => dispatch(removeCourse(el))} size="large"  danger/></td>
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
export default AdminTeachers;