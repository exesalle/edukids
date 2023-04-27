import React, {useEffect, useState} from 'react';
import AdminMenu from '../../components/AdminMenu';
import {RootState, useStoreDispatch} from '../../store/store';
import {useSelector} from 'react-redux';
import {Button, Input, Modal, Select, Space, Table, Tag} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {getCourses} from '../../store/coursesSlice';
import {getTeachers} from '../../store/teachersSlice';
import uuid from 'react-uuid';
import {IGroupData, IUserInfo} from '../../Types';
import {addGroup, getGroup, removeGroup, updateGroup} from '../../store/groupsSlice';
import {getUsers} from '../../store/usersSlice';

const AdminGroups = () => {

  const columns = [
    {
      title: 'Название',
      key: 'name',
      dataIndex: 'name',
      render: (_:any, item: IGroupData) => {
        return (
          <>
            <Tag color="green" style={{ fontSize: '100%', padding:'10px'}}>{item.name}</Tag>
          </>);
      }
    },
    {
      title: 'Ученики',
      key: 'students',
      dataIndex: 'students',
      render: (_:any, item: IGroupData) => {
        return (
          <>
            {item.students.map((el) =>
              <Tag key={uuid()} color="green">{el}</Tag>
            )}

          </>);
      }
    },
    {
      width: '10%',
      render: (item: IGroupData) => {
        return (
          <>
            <Space key={uuid()}  size="middle">
              <Button type="primary" key={uuid()}  icon={<EditOutlined />} onClick={() => showModal(item)} size="large" />
              <Button type="primary"  key={uuid()}  icon={<DeleteOutlined />} onClick={() => dispatch(removeGroup(item))} size="large" danger/>
            </Space>
          </>
        );
      }
    }
  ];

  const [groupData, setGroupData] = useState<IGroupData>({
    id: 1,
    name: '',
    students: []
  });
  const [editData, setEditData] = useState<IGroupData>({
    id: 1,
    name: '',
    students: []
  });
  const dispatch = useStoreDispatch();
  const users = useSelector((state:RootState)=> state.users.users);
  const groups = useSelector((state:RootState)=> state.groups.groups);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(getGroup());
      dispatch(getUsers());
    };
  }, [dispatch]);

  const showModal = (group: IGroupData) => {
    setIsModalOpen(true);
    setEditData({id: group.id, name: group.name, students: group.students});
    console.log(group.students);
  };

  const handleOk = () => {
    dispatch(updateGroup(editData));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOnChangeEdit = (value: IUserInfo) => {
    //setEditData({...editData, students: [value]});
  };

  const handleOnChangeAdd = (value:string) => {
    //setGroupData({...groupData, teacher: value});
  };

  const handleAddGroup = () => {
    dispatch(addGroup({id: Date.now(), name:groupData.name, students:[]}));
    setGroupData({...groupData, name: ''});
  };

  return (
    <>
      <AdminMenu/>
      <div className="main-screen">
        <div className="input-course">
          <Input placeholder="Название" type="name" value={groupData.name}
            onChange={(e) => setGroupData({...groupData, name: e.target.value})} />
          <Button type="primary" onClick={handleAddGroup}>Добавить группу</Button>
        </div>

        <Table columns={columns} dataSource={groups} rowKey={uuid}  />
        <Modal title="Редактировать" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Input addonBefore="Название:" type="name" value={editData.name}
            onChange={(e) => setEditData({...editData, name: e.target.value})} />

          <Select placeholder={'Добавить ученика'} onSelect={(value) => setEditData({...editData.students, ...value})} >
            {users.map(el =>
              <Select.Option value={el.id} key={el.id} >{el.name}</Select.Option >
            )}
          </Select>
        </Modal>
      </div>
    </>
  );
};

export default AdminGroups;