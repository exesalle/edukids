import React, {useEffect, useState} from 'react';
import AdminMenu from '../../components/AdminMenu';
import {RootState, useStoreDispatch} from '../../store/store';
import {useSelector} from 'react-redux';
import {Button, Input, Modal, Select, Space, Table} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {addCourse, getCourses, removeCourse, updateCourse} from '../../store/coursesSlice';
import {getTeachers} from '../../store/teachersSlice';
import {getUsers, removeUser, updateUser} from '../../store/usersSlice';
import {ICoursesData, IUserInfo} from '../../Types';
import {ColumnProps, ColumnsType} from 'antd/es/table';
import TableComp from '../../components/tables/table';
import SearchTable from '../../components/tables/table';
import uuid from 'react-uuid';



const AdminUsers = () => {


  const columns = [
    {
      title: 'name',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'email',
      key: 'email',
      dataIndex: 'email'
    },
    {
      width: '10%',
      render: (item: IUserInfo) => {
        return (
          <>
            <Space size="middle">
              <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(item)} size="large" />
              <Button type="primary" icon={<DeleteOutlined />} onClick={() => dispatch(removeUser(item))} size="large" danger/>
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
  const [editData, setEditData] = useState<IUserInfo>({
    id: 1,
    name: '',
    email: '',
    password: '',
    course: []
  });
  const dispatch = useStoreDispatch();
  const teachers = useSelector((state:RootState)=> state.teachers.teachers);
  const courses = useSelector((state:RootState)=> state.courses.courses);
  const users = useSelector((state:RootState)=> state.users.users);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(getUsers());
      dispatch(getTeachers());
    };
  }, [dispatch]);

  const showModal = (user: IUserInfo) => {
    setIsModalOpen(true);
    setEditData({id: user.id, name: user.name, email: user.email, password: user.password, course: user.course});
  };

  const handleOk = () => {
    dispatch(updateUser(editData));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOnChangeEdit = (value:string) => {
    //setEditData({...editData, teacher: value});
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
        <Table columns={columns} dataSource={users} rowKey={uuid}/>
        <Modal title="Редактировать" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Input addonBefore="Название:" type="name" value={editData.name}
            onChange={(e) => setEditData({...editData, name: e.target.value})} />
        </Modal>
      </div>

    </>
  );
};

export default AdminUsers;