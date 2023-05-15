import React, {FC, useEffect, useState} from 'react';
import AdminMenu from '../../components/AdminMenu';
import {useSelector} from 'react-redux';
import {RootState, useStoreDispatch} from '../../store/store';
import {Button, Input, Modal, Select, Space, Table, Tag} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {addCourse, getCourses, removeCourse, updateCourse} from '../../store/coursesSlice';
import {getTeachers} from '../../store/teachersSlice';
import {ICoursesData} from '../../Types';
import uuid from 'react-uuid';


const AdminCourses:FC = () => {

  const columns = [
    {
      title: 'Направления',
      key: 'name',
      dataIndex: 'name',
      render: (_:string, item: ICoursesData) => {
        return (
          <>
            <Tag color="green" key={item.name} style={{ fontSize: '120%', padding:'10px'}}>{item.name}</Tag>
          </>);
      }
    },
    {
      width: '10%',
      render: (item: ICoursesData) => {
        return (
          <>
            <Space key={uuid()}  size="middle">
              <Button type="primary" key={uuid()}  icon={<EditOutlined />} onClick={() => showModal(item)} size="large" />
              <Button type="primary"  key={uuid()}  icon={<DeleteOutlined />} onClick={() => dispatch(removeCourse(item))} size="large" danger/>
            </Space>
          </>
        );
      }
    }
  ];

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
  }, []);

  const showModal = (course: ICoursesData) => {
    setIsModalOpen(true);
    setEditData({id: course.id, name: course.name, teacher: course.teacher});
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

  const handleAddCourse = () => {
    dispatch(addCourse({id: Date.now(), name:courseData.name, teacher:courseData.teacher}));
    setCourseData({...courseData, name: ''});
  };

  return (
    <>
      <AdminMenu/>
      <div className="main-screen">
        <div className="input-course">
          <Input placeholder="Название" type="name" value={courseData.name}
            onChange={(e) => setCourseData({...courseData, name: e.target.value})} />

          <Button type="primary" onClick={handleAddCourse}>Добавить направление</Button>
        </div>
        <div>

          <Table columns={columns} dataSource={courses} rowKey={uuid}/>
          <Modal title="Редактировать" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Input addonBefore="Название:" type="name" value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})} />
            <Select  value={editData.teacher} onSelect={(value) => handleOnChangeEdit(value)} >
              {teachers.map((el, index) =>
                <Select.Option value={el.name} key={index} >{el.name}</Select.Option >
              )}
            </Select>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AdminCourses;