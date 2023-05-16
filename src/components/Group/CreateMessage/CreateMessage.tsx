import React, { useEffect, useState } from 'react';
import { CreateMessageProps } from '../../../Types';
import {Button, Input} from 'antd';
import {SendOutlined} from '@ant-design/icons';

const CreateMessage = ({ handleSubmit, existingMessage }: CreateMessageProps) => {
  const [message, setMessage] = useState('');
  const { TextArea } = Input;

  useEffect(() => {
    if (existingMessage) {
      setMessage(() => existingMessage);
    } else {
      setMessage(() => '');
    }
  }, [existingMessage]);

  const sendMessage = () => {
    handleSubmit(message);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };


  return (
    <div className="message-box">
      <TextArea autoSize={{ minRows: 3, maxRows: 3}}  placeholder="Написать сообщение..." value={message} onKeyDown={handleKeyDown} onChange={(e) => setMessage(e.target.value)}>
      </TextArea>
      <Button type="primary" className="button" value="" onClick={sendMessage} icon={<SendOutlined />}>Отправить</Button>

    </div>
  );
};

export default CreateMessage;
