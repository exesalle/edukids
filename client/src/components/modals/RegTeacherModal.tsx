import React, {useState} from 'react';
import {Modal} from 'antd';
import {SignUp} from '../SignUp';

type Props = {
  isOpen: boolean,
}


const RegTeacherModal = (props:Props) => {

  const [isRegOpen, setIsRegOpen] = useState(props.isOpen);

  const handleRegOk = () => {
    setIsRegOpen(false);
  };

  const handleRegCancel = () => {
    setIsRegOpen(false);
  };

  return (
    <Modal title="Добавить преподавателя" open={isRegOpen} onOk={handleRegOk} onCancel={handleRegCancel}>
      <div className="auth">
        <SignUp teacher/>
      </div>
    </Modal>
  );
};

export default RegTeacherModal;