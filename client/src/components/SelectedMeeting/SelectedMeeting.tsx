import {Link, useNavigate} from 'react-router-dom';

import './SelectedMeeting.css';
import React, {useState} from 'react';
import {SelectedMeetingProps} from '../../Types';
import {Button, Modal, Tag} from 'antd';



const SelectedMeeting = ( { selectedEvent, setModalState }: SelectedMeetingProps) => {

  const [isModalOpen, setIsModalOpen] = useState(true);

  const push = useNavigate();
  const handleOk = () => {
    push(`/my-meetings/${selectedEvent.id}`);
    setIsModalOpen(false);
    setModalState(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModalState(false);
  };


  return (
    <Modal
      title={selectedEvent.title}
      open={isModalOpen}
      okText="Подключиться"
      okButtonProps={{ style: { backgroundColor: 'DarkSeaGreen' }}}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Tag color="green">Начало:</Tag>{selectedEvent.start} <br />
      <Tag color="red">Конец: </Tag>{selectedEvent.end}<br />
        Преподаватель: {selectedEvent.participants.join(', ')} <br />
    </Modal>
  );
};

export default SelectedMeeting;
