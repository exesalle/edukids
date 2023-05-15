import React, {useEffect, useState} from 'react';
import AdminMenu from '../../components/AdminMenu';
import {RootState, useStoreDispatch} from '../../store/store';
import {useSelector} from 'react-redux';
import {Button, Input, Modal, Space, Table} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {addCourse} from '../../store/coursesSlice';
import {getTeachers} from '../../store/teachersSlice';
import {getUsers, removeUser, updateUser} from '../../store/usersSlice';
import {IUserInfo} from '../../Types';
import uuid from 'react-uuid';
import {getAuth} from 'firebase/auth';

const AdminUsers = () => {

  const columns = [
    {
      title: 'ФИО',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'email',
      key: 'email',
      dataIndex: 'email'
    },
    // {
    //   width: '10%',
    //   render: (item: IUserInfo) => {
    //     return (
    //       <>
    //         <Space size="middle">
    //           <Button type="primary" icon={<EditOutlined />} onClick={() => showModal(item)} size="large" />
    //           <Button type="primary" icon={<DeleteOutlined />} onClick={() => dispatch(removeUser(item))} size="large" danger/>
    //         </Space>
    //       </>
    //     );
    //   }
    // }
  ];

  const [courseData, setCourseData] = useState({
    name: '',
    teacher: ''
  });
  const [editData, setEditData] = useState<IUserInfo>({} as IUserInfo);
  const dispatch = useStoreDispatch();
  const users = useSelector((state:RootState)=> state.users.users);
  const auth = getAuth();
  const user = auth.currentUser;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log(user?.displayName);
    return () => {

      dispatch(getUsers());
      dispatch(getTeachers());
    };
  }, [dispatch]);

  const showModal = (user: IUserInfo) => {
    setIsModalOpen(true);
    setEditData({
      ...editData,
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      course: user.course,
      isTeacher: user.isTeacher
    });
  };

  const handleOk = () => {
    dispatch(updateUser(editData));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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