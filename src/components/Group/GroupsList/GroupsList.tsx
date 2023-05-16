import React, { useContext, useState } from 'react';
import uuid from 'react-uuid';
import { getChatByName, getChatById } from '../../../services/chats.services';
import { IChat, IChatsListProps } from '../../../Types';
import './GroupsList.scss';
import AppContext from '../../../providers/AppContext';
import {Button, Input} from 'antd';
import {auth} from '../../../firebase';

const GroupsList = ({ props }:  IChatsListProps) => {

  const {
    setIsCreateChatClicked,
    setIsDetailedChatClicked,
  } = useContext(AppContext);

  const [activeChannel, setActiveChannel] = useState<IChat>({} as IChat);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const user = auth.currentUser;
  const getChannelsBySearchTerm = (searchTerm: string, channels: IChat[]) => {
    return channels.filter((channel) =>
      channel.title.toLowerCase().includes(searchTerm));
  };
  const result = getChannelsBySearchTerm(searchTerm, props.chats!);

  const handleOpenChannel = (chanObj: IChat) => {
    openDetailedChat(chanObj);
    setActiveChannel(chanObj);
  };

  const mappingChats = (chanObj: IChat, key: string) => {
    return <div key={key} className="chat-items">
      <button onClick={() => handleOpenChannel(chanObj)} className={activeChannel.title === chanObj.title ?'chat-item-active' : 'chat-item'}>{chanObj.title}</button>
    </div>;
  };

  const openCreateChat = () => {
    setIsCreateChatClicked(true);
    setIsDetailedChatClicked(false);
  };

  const openDetailedChat = (chanObj: IChat) => {
    setIsDetailedChatClicked(true);
    setIsCreateChatClicked(false);
    getChatByName(chanObj.title)
      .then((res) => Object.keys(res.val()))
      .then((res) => getChatById(res[0]).catch(console.error))
      .then((res) => props.setCurrentChat(res))
      .catch(console.error);
  };

  return (
    <div className="chats-channels-list">
      {user?.displayName === 'admin' ?
        <>
          <Button style={{width: '200px'}} onClick={openCreateChat}>Создать группу</Button>
          <h4>Группы:</h4>
          <Input style={{width: '200px'}} type="text" value={searchTerm} placeholder="Поиск..." onChange={(event) => setSearchTerm(event.target.value)} />
        </> : null
      }
      <div className="chats">
        {props.chats && result.map((chanObj) => mappingChats(chanObj, uuid()))}
      </div>

    </div>
  );
};

export default GroupsList;
