import { ChatParticipantsProps, IUserInfo } from '../../Types';
import React, { useContext } from 'react';
import AppContext from '../../providers/AppContext';
import UserComponent from '../User/User';
import uuid from 'react-uuid';
import ScheduleLesson from '../ScheduleLesson/ScheduleLesson';
import {Button} from 'antd';
import {auth} from '../../firebase';

const ChatParticipants = ({ currentChat, allUsers, owner }: ChatParticipantsProps): JSX.Element | null => {
  const {
    isDetailedChatClicked,
    setIsMeetingClicked,
    isMeetingClicked,
  } = useContext(AppContext);

  if (owner && currentChat.participants.includes(owner?.username) &&
    allUsers.every((user) => user.username !== owner?.username)) {
    allUsers = [...allUsers, owner];
  }

  const user = auth.currentUser;

  const mappingParticipants = (participant: IUserInfo, key: string) => {
    console.log(participant);
    return <div key={key}>
      <UserComponent props={{ user: participant}} />
    </div>;
  };

  const currentChatUsers = allUsers
    .filter((user) => currentChat.participants.includes(user.username));

  return (
    !user?.displayName?.includes('user') ?
      isDetailedChatClicked  ?
        <div className="participants-list">
          {isMeetingClicked ?
            <Button
              style={{width: '220px', margin: '5px'}}
              onClick={() => setIsMeetingClicked(!isMeetingClicked)}
            >Состав группы</Button> :
            <Button
              style={{width: '220px',  margin: '5px'}}
              onClick={() => setIsMeetingClicked(!isMeetingClicked)}
            >Создать новое занятие</Button>
          }

          {isMeetingClicked ?
            <ScheduleLesson currentChat={currentChat}/> :
            <>
              <h4>Состав группы:</h4><div>
                {currentChatUsers.map((participant) => mappingParticipants(participant, uuid()))}
              </div>
            </>
          }
        </div> :
        <></> :
      <></>
  );
};

export default ChatParticipants;
