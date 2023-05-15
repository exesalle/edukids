import React, {useState} from 'react';
import {SelectedLessonProps} from '../../Types';
import { Modal, Tag} from 'antd';



const SelectedLesson = ({ selectedEvent, setModalState }: SelectedLessonProps) => {

  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleOk = () => {
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
      okText="Ок"
      okButtonProps={{ style: { backgroundColor: 'DarkSeaGreen' }}}
      onOk={handleOk}
      onCancel={handleCancel}>
      <Tag color="green">Начало:</Tag>{selectedEvent.start} <br />
      {/*<Tag color="red">Конец: </Tag>{selectedEvent.end}<br />*/}
    </Modal>
  );
};

export default SelectedLesson;
