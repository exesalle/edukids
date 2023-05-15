import React, {useState} from 'react';
import uuid from 'react-uuid';
import {ChatParticipantsProps,IMark, IUserInfo} from '../Types';
import UserComponent from './User/User';
import {Button, Col, DatePicker, DatePickerProps, Row, Select, Space, Table, Tag} from 'antd';
import {RootState, useStoreDispatch} from '../store/store';
import {addMark, getMarks} from '../store/marksSlice';
import {useSelector} from 'react-redux';
import {auth} from '../firebase';

const UserInfo = ({ currentChat, allUsers }: ChatParticipantsProps): JSX.Element | null => {

  const user = auth.currentUser;
  const [mark, setMark] = useState<IMark>({} as IMark);
  const [activeUser, setActiveUser] = useState<IUserInfo>({} as IUserInfo);
  const dispatch = useStoreDispatch();
  const marks = useSelector((state:RootState)=> state.marks.marks);
  const columns = [
    {
      title: 'Оценка',
      key: 'mark',
      dataIndex: 'mark',
      render: (_: string, item: IMark) => {
        return (
          <>
            <Tag color="green" style={{ fontSize: '100%'}}>{item.mark}</Tag>
          </>);
      }
    },
    {
      title: 'Дата',
      key: 'data',
      dataIndex: 'date',
      render: (_: string, item: IMark) => {
        return (
          <>
            <Tag color="green">{item.date}</Tag>
          </>);
      }
    },

    {
      width: '10%',
      render: (_: string, item: IMark) => {
        return (
          <>
            <Space key={uuid()}  size="middle">
              {/*<Button type="primary" key={uuid()}  icon={<EditOutlined />} onClick={() => showModal(item)} size="large" />*/}
              {/*<Button type="primary"  key={uuid()}  icon={<DeleteOutlined />} onClick={() => dispatch(removeEvent(item))} size="large" danger/>*/}
            </Space>
          </>
        );
      }
    }
  ];


  const mappingParticipants = (participant: IUserInfo, key: string) => {
    const buttonEl: JSX.Element =
        <button onClick={() => {
          dispatch(getMarks(participant, currentChat.course));
          setActiveUser(participant);
        }} id="add-remove-user-btn"> Выбрать
        </button>;
    return <div key={key}>
      <UserComponent props={{ user: participant, buttonEl}} />
    </div>;
  };

  const currentChannelUsers = allUsers
    .filter((user) => currentChat.participants.includes(user.username) && user.username.includes('user'));

  const handleAddMark = () => {
    dispatch(addMark(mark, activeUser, currentChat.course));
    dispatch(getMarks(activeUser, currentChat.course));
  };

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setMark({...mark, date: dateString});
  };

  const handleOnChangeMark = (value:string) => {
    setMark({...mark, mark: value});
  };

  return (
    <>
      {currentChat?.course ?
        !user?.displayName?.includes('user') ?
          <>
            <div style={{ height: '600px', padding: 20}}>
              <h2 style={{textAlign: 'center'}}>Журнал</h2>
              <h3 style={{textAlign: 'center'}}>{activeUser.name}</h3>
              <Row>
                <Col span={9}  style={{width: '250px', overflowY: 'auto'}}>
                  {currentChannelUsers.map((participant) => mappingParticipants(participant, uuid()))}
                </Col>
                <Col span={15} >

                  <div className="input-course">
                    <Select defaultValue="Оценка" style={{width: 230}} onSelect={(value) => handleOnChangeMark(value)} >
                      <Select.Option value="5" key={uuid()}>5</Select.Option>
                      <Select.Option value="4" key={uuid()}>4</Select.Option>
                      <Select.Option value="3" key={uuid()}>3</Select.Option>
                      <Select.Option value="2" key={uuid()}>2</Select.Option>
                    </Select>
                    <DatePicker placeholder="Дата" style={{width: 230}} format="DD-MM-YYYY" onChange={onChangeDate} />
                    <Button type="primary" onClick={handleAddMark}>Добавить</Button>
                  </div>
                  <Table style={{ height: '500px', overflowY: 'auto'}} pagination={{ pageSize: 6}} columns={columns} dataSource={marks} rowKey={uuid} />
                </Col>
              </Row>
            </div>
          </> :
          <></>: <></>}
    </>
  );
};

export default UserInfo;