import React, {useContext, useEffect, useState} from 'react';
import {createChat, getChatByName, getLiveChatsByUsername, updateUserChats} from '../../services/chats.services';
import {IChat,IUserInfo} from '../../Types';
import {auth} from '../../firebase';
import ManiPulateUsersLists from './ManipulateUsersLists/ManiPulateUsersLists';
import AppContext from '../../providers/AppContext';
import ChatParticipants from './GroupParticipants/GroupParticipants';
import Channel from './ChatWindow/ChatWindow';
import {getUsers} from '../../store/usersSlice';
import {RootState, useStoreDispatch} from '../../store/store';
import {useSelector} from 'react-redux';
import {Button, Input, Select} from 'antd';
import UserInfo from '../UserInfo';
import {getTeachers} from '../../store/teachersSlice';
import {getCourses} from '../../store/coursesSlice';
import ChatsList from './ChatsList/ChatsList';



const Group:React.FC= () => {

  const {
    isDetailedChatClicked,
    isCreateChatClicked,
    setIsCreateChatClicked,
    setIsDetailedChatClicked,
  } = useContext(AppContext);

  const [currentChat, setCurrentChat] = useState<IChat>({
    id: '',
    title: '',
    participants: [],
    messages: [],
    isPublic: false,
    lastActivity: new Date(),
    course:''});
  const [initialParticipants, setInitialParticipants] = useState<IUserInfo[]>([]);
  const [addedParticipants, setAddedParticipants] = useState<IUserInfo[]>([]);
  const [chats, setChannels] = useState<IChat[]>([]);
  const [groupData, setGroupData] = useState({
    name: '',
    teacher: 'Преподаватель',
    course: 'Направление'
  });
  const user = auth.currentUser;
  const dispatch = useStoreDispatch();
  const users = useSelector((state:RootState)=> state.users.users);
  const courses = useSelector((state:RootState)=> state.courses.courses);
  useEffect(() => {
    console.log(user?.displayName);
    dispatch(getUsers());
    dispatch(getTeachers());
    dispatch(getCourses());
    setInitialParticipants(users);
    if (user?.displayName) {
      const unsubscribe = getLiveChatsByUsername(user.displayName,
        (snapshot) => {
          if (snapshot.exists()) {
            const userChatsNames = Object.keys(snapshot.val());
            const channelsObjPr = userChatsNames.map((chatName) => {
              return getChatByName(chatName)
                .then((snapshotChanObj) => {
                  if (snapshot.exists()) {
                    // eslint-disable-next-line @typescript-eslint/ban-types
                    const dbObject: object = snapshotChanObj.val();
                    const id: string = Object.keys(dbObject)[0];
                    const channel: IChat = Object.values(dbObject)[0];

                    channel.id = id;
                    return channel;
                  } else {
                    return {} as IChat;
                  }
                });
            });

            Promise.all(channelsObjPr)
              .then((values) => {
                const sortedChannels: IChat[] = values
                  .sort((chan1, chan2) => +chan1.lastActivity < +chan2.lastActivity ? 1 : -1);
                setChannels(sortedChannels);
              });
          }
        });

      return () => unsubscribe();
    }
  }, []);



  const createChatFunc = () => {
    const userIDs = addedParticipants.map((user) => user.username);
    console.log(user?.displayName);
    getChatByName(groupData.name)
      .then((snapshot) => {
        if (snapshot.exists()) {
          return console.log('Название уже занято');
        } else {
          createChat(groupData.name, [...userIDs, user?.displayName || 'default_username'], groupData.teacher, groupData.course)
            .then((res) => {
              setCurrentChat(res);
              console.log('Успешно создано!');
              setIsCreateChatClicked(!isCreateChatClicked);
              [...userIDs, user?.displayName || 'default_username'].map((participant) => updateUserChats(participant, groupData.name));
            })
            .catch((err) => console.log(`Ошибка  ${err.message}`));

          setInitialParticipants(users);
          setAddedParticipants([]);
          setIsDetailedChatClicked(true);
          setGroupData({
            name: '',
            teacher: 'Преподаватель',
            course: 'Направление'});
        }
      });
  };

  const handleOnChangeCourse = (value:string) => {
    setGroupData({...groupData, course: value});
  };

  return (
    <>
      <ChatsList props={{ chats, setCurrentChat }} />

      <div style={{width: '100%'}
      }>

        <> {isCreateChatClicked ?
          <>
            <div className="main-screen">
              <Input style={{ width: 230, marginRight: 10 }}  name="group-name" placeholder="Введите название группы..." required defaultValue=""
                onChange={(e) => setGroupData({
                  ...groupData,
                  name: e.target.value.trim()
                })} />
              <Select style={{ width: 330 , marginRight: 20 }} value={groupData.course} onSelect={(value) => handleOnChangeCourse(value)} >
                {courses.map((el, index) =>
                  <Select.Option value={el.name} key={index} >{el.name}</Select.Option >
                )}
              </Select>

              <Button type="primary" className="create-a-team" onClick={createChatFunc}>Создать</Button>
            </div>
            <ManiPulateUsersLists
              leftSide={initialParticipants}
              setLeftSide={setInitialParticipants}
              rightSide={addedParticipants}
              setRightSide={setAddedParticipants} />
          </>: null}
        {isDetailedChatClicked ?
          <>
            <Channel currentChat={currentChat} />
            <UserInfo  currentChat={currentChat} allUsers={users}/>
          </> : <></>
        }

        </>
      </div>
      <ChatParticipants currentChat={currentChat} allUsers={users} />
    </>
  );
};

export default Group;