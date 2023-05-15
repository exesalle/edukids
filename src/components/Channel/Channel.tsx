import { ChatProps, IMessage } from '../../Types';
import React, { useEffect, useRef, useState } from 'react';
import { editMessage, fromMessagesDocument, getLiveMessages } from '../../services/messages.services';
import CreateMessage from '../CreateMessage/CreateMessage';
import Message from '../Message/Message';
import { addMessage } from '../../services/messages.services';
import { updateChatLastActivity } from '../../services/chats.services';
import './Channel.scss';
import {auth} from '../../firebase';

const Channel = ({ currentChat }: ChatProps) => {
  const user = auth.currentUser;

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [messageToBeEdited, setMessageToBeEdited] = useState<IMessage>();
  const [isInEditMode, setIsInEditMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsInEditMode(false);
    setMessageToBeEdited({} as IMessage);
  }, [currentChat]);

  useEffect(() => {
    if (currentChat.id === '') return;

    const unsubscribe = getLiveMessages(currentChat.id, (snapshot) => {
      const processedMessages = fromMessagesDocument(snapshot);
      setMessages(processedMessages);
    });

    return () => unsubscribe();
  }, [currentChat.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEditMessage = (currentMessage: IMessage) => {
    setIsInEditMode(true);
    setMessageToBeEdited(currentMessage);
  };

  const handleSubmit = (message: string) => {
    if (message.trim().length > 0) {
      if (isInEditMode) {
        setIsInEditMode(false);
        editMessage(currentChat?.id, messageToBeEdited?.id, message)
          .catch(console.error);
      } else {
        addMessage(currentChat.id, user?.displayName|| 'default_username', message)
          .then(() => updateChatLastActivity(currentChat.id, Date.now()))
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      console.log('Введите сообщение');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {currentChat?.course ?
        <div className="channel-container">
          <div style={{textAlign: 'center'}}>
            <h3>Группа: {currentChat.title}</h3>
            <h3>Направление: {currentChat.course}</h3>
            <h3>Групповой чат:</h3>
          </div>

          <div className="messages-container">
            {messages.length === 0 ?
              <p>Напишите первое сообщение</p> :
              <>
                {messages.map((message, key) => <Message currentChannel={currentChat}
                  message={message} handleEditMessage={handleEditMessage} key={key}
                  toBeEdited={messageToBeEdited === message} />)}

                <div ref={messagesEndRef}></div>
              </>
            }
          </div>
          <CreateMessage handleSubmit={handleSubmit} existingMessage={messageToBeEdited?.content} />
        </div> : <><h2 style={{textAlign: 'center', marginTop: 200}}>⇐ Выберите группу</h2></> }
    </>
  );
};

export default Channel;
