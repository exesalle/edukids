import React, {useState} from 'react';
import {Input, Modal, Select} from 'antd';
import {updateCourse} from '../../store/coursesSlice';
import {RootState, useStoreDispatch} from '../../store/store';
import {useSelector} from 'react-redux';

type Props = {
  id: number,
  name: string,
  teacher: string
}


const EditTeacherModal = () => {

  const [editData, setEditData] = useState({
    id: 1,
    name: '',
    teacher: ''
  });

  const dispatch = useStoreDispatch();
  const teachers = useSelector((state:RootState)=> state.teachers.teachers);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleEditOk = () => {
    dispatch(updateCourse(editData));
    setIsEditOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditOpen(false);
  };

  const handleOnChangeEdit = (value:string) => {
    setEditData({...editData, teacher: value});
  };

  return (
    <Modal title="Редактировать" open={isEditOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
      <Input addonBefore="Название:" type="name" value={editData.name}
        onChange={(e) => setEditData({...editData, name: e.target.value})} />
      <Select  value={editData.teacher} onSelect={(value) => handleOnChangeEdit(value)} >
        {teachers.map(el =>
          <Select.Option value={el.name} key={el.id} >{el.name}</Select.Option >
        )}
      </Select>
    </Modal>
  );
};

export default EditTeacherModal;