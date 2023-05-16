import React, {useEffect, useState} from 'react';
import AdminMenu from '../../components/Menu/AdminMenu';
import {useSelector} from 'react-redux';
import {RootState, useStoreDispatch} from '../../store/store';
import {getCourses} from '../../store/coursesSlice';
import {Button, Input, Modal, Select, Space, Table, Tag} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {getTeachers, removeTeacher, updateTeacher} from '../../store/teachersSlice';
import {SignUp} from '../../components/SignUp';
import uuid from 'react-uuid';
import {ITeachersData} from '../../Types';

const AdminTeachers:React.FC = () => {

  const [courseData, setCourseData] = useState({
    name: '',
    teacher: ''
  });
  const [editData, setEditData] = useState<ITeachersData>({
    id: '',
    name: '',
    email: '',
    password: '',
    course: []
  });
  const dispatch = useStoreDispatch();
  const teachers = useSelector((state:RootState)=> state.teachers.teachers);
  const courses = useSelector((state:RootState)=> state.courses.courses);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);

  const columns = [
    {
      title: 'ФИО',
      key: 'name',
      dataIndex: 'name',
      render: (_:string, item: ITeachersData) => {
        return (
          <>
            <Tag color="green" style={{ fontSize: '100%', padding:'10px'}}>{item.name}</Tag>
          </>);
      }
    },
    // {
    //   width: '10%',
    //   render: (item: ITeachersData) => {
    //     return (
    //       <>
    //         <Space key={uuid()}  size="middle">
    //           <Button type="primary" key={uuid()}  icon={<EditOutlined />} onClick={() => showEditModal(item)} size="large" />
    //           <Button type="primary"  key={uuid()}  icon={<DeleteOutlined />} onClick={() => dispatch(removeTeacher(item))} size="large" danger/>
    //         </Space>
    //       </>
    //     );
    //   }
    // }
  ];

  useEffect(() => {
    return () => {
      dispatch(getCourses());
      dispatch(getTeachers());
    };
  }, []);


  const handleEditOk = () => {
    dispatch(updateTeacher(editData));
    setIsEditOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditOpen(false);
  };

  const handleOnChangeEdit = (value:[]) => {
    setEditData({...editData, course: value});
  };

  const showEditModal = (teacher: ITeachersData) => {
    setIsEditOpen(true);
    setEditData(teacher);
  };



  const handleRegOk = () => {
    setIsRegOpen(false);
  };

  const handleRegCancel = () => {
    setIsRegOpen(false);
  };


  return (
    <>
      <AdminMenu/>
      <div className="main-screen">
        <div className="input-course">
          <Button type="primary" onClick={() => {setIsRegOpen(true);}}>Зарегистрировать преподавателя</Button>
        </div>
        <Modal title="Редактировать" open={isEditOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
          <Input addonBefore="Название:" type="name" value={editData.name}
            onChange={(e) => setEditData({...editData, name: e.target.value})} />

        </Modal>
        <Modal title="Добавить преподавателя" open={isRegOpen} onOk={handleRegOk} onCancel={handleRegCancel}>
          <div className="auth">
            <SignUp teacher/>
          </div>
        </Modal>
        <Table columns={columns} dataSource={teachers} rowKey={uuid}/>
      </div>
    </>
  );
};
export default AdminTeachers;