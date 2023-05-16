import React, {useEffect, useState} from 'react';
import AdminMenu from '../../components/Menu/AdminMenu';
import {RootState, useStoreDispatch} from '../../store/store';
import {useSelector} from 'react-redux';
import {Button, DatePicker, DatePickerProps, Input, Modal, Select, Space, Table, Tag, TimePicker} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {addEvent, getEvents, removeEvent, updateEvent} from '../../store/eventsSlice';
import {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {IEventsData} from '../../Types';
import uuid from 'react-uuid';
import {getUsers} from '../../store/usersSlice';

const AdminEvents:React.FC = () => {

  dayjs.extend(customParseFormat);
  const [eventsData, setEventsData] = useState<IEventsData>({
    prize: ['Не назначено','Не назначено','Не назначено']} as IEventsData);
  const [editData, setEditData] = useState<IEventsData>({
    prize: ['Не назначено','Не назначено','Не назначено']} as IEventsData);

  const columns = [
    {
      title: 'Название',
      key: 'name',
      dataIndex: 'name',
      render: (_: string, item: IEventsData) => {
        return (
          <>
            <Tag color="green" style={{ fontSize: '100%', padding:'10px'}}>{item.name}</Tag>
          </>);
      }
    },
    {
      title: 'Дата',
      key: 'data',
      dataIndex: 'date',
      render: (_: string, item: IEventsData) => {
        return (
          <>
            <Tag color="green">{item.date}</Tag>
          </>);
      }
    },
    {
      title: 'Время',
      key: 'time',
      dataIndex: 'time',
      render: (_: string, item: IEventsData) => {
        return (
          <>
            <Tag color="green">{item.time}</Tag>
          </>);
      }
    },
    {
      title: 'Призовые места',
      key: 'prize',
      dataIndex: 'prize',
      render: (_: string, item: IEventsData) => {
        return (
          <>
            1 место: <Tag color="purple">{item?.prize[0] || 'Не назначено'}</Tag><br />
            2 место: <Tag color="purple">{item?.prize[1] || 'Не назначено'}</Tag><br />
            3 место: <Tag color="purple"> {item?.prize[2] || 'Не назначено'}</Tag>
          </>);
      }
    },
    {
      width: '10%',
      render: (_: string, item: IEventsData) => {
        return (
          <>
            <Space key={uuid()}  size="middle">
              <Button type="primary" key={uuid()}  icon={<EditOutlined />} onClick={() => showModal(item)} size="large" />
              <Button type="primary"  key={uuid()}  icon={<DeleteOutlined />} onClick={() => dispatch(removeEvent(item))} size="large" danger/>
            </Space>
          </>
        );
      }
    }
  ];

  const dispatch = useStoreDispatch();
  const events = useSelector((state:RootState)=> state.events.events);
  const users = useSelector((state:RootState)=> state.users.users);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(getEvents());
      dispatch(getUsers());
    };
  }, [dispatch]);

  const showModal = (el:IEventsData) => {
    setEditData(el);
    setIsModalOpen(true);
    console.log(el);
  };

  const handleOk = () => {
    dispatch(updateEvent(editData));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOnChangeFirst = (value:string) => {
    setEditData({...editData,  prize:{...editData.prize, [0]: value}});
  };
  const handleOnChangeSecond = (value:string) => {
    setEditData({...editData,  prize:{...editData.prize, [1]: value}});
  };

  const handleOnChangeThird = (value:string) => {
    setEditData({...editData,  prize:{...editData.prize, [2]: value}});
  };


  const handleAddEvent = () => {
    dispatch(addEvent({
      id: Date.now(),
      name:eventsData.name,
      date:eventsData.date,
      time:eventsData.time,
      prize: eventsData.prize
    }));
    setEventsData({...eventsData, name: ''});
  };

  const format = 'HH:mm';

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setEventsData({...eventsData, date:dateString});
    setEditData({...editData, date: dateString});
  };

  const onChangeTime = (time: Dayjs, timeString: string) => {
    console.log(time, timeString);
  };

  return (
    <>
      <AdminMenu/>
      <div className="main-screen">
        <div className="input-course">
          <Input placeholder="Название" type="name" value={eventsData.name}
            onChange={(e) => setEventsData({...eventsData, name: e.target.value})} />
          <DatePicker placeholder="Дата" style={{ width: 230 }} format="DD-MM-YYYY" onChange={onChangeDate} />
          <TimePicker
            placeholder="Время"
            style={{ width: 230 }}
            minuteStep={5}
            hourStep={1}
            format={format}
            onChange={(value, dateString) => {setEventsData({...eventsData, time: dateString});}}/>
          <Button type="primary" onClick={handleAddEvent}>Добавить мероприятие</Button>
        </div>
        <Table columns={columns} dataSource={events} rowKey={uuid}  />
        <Modal title="Редактировать" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Input addonBefore="Название:" type="name" value={editData.name}
            onChange={(e) => setEditData({...editData, name: e.target.value})} />
          <div className="input-course">
            <DatePicker value={dayjs(editData.date, 'DD-MM-YYYY')} style={{ width: 130 }} format="DD-MM-YYYY" onChange={onChangeDate} />
            <TimePicker
              value={dayjs(editData.time, 'HH:mm')}
              style={{ width: 130 }}
              minuteStep={5}
              hourStep={1}
              format={format}
              onChange={(value, dateString) => {setEditData({...editData, time: dateString});}}/></div>
          <Tag color="purple">1 место:</Tag>
          <Select value={editData?.prize[0]|| 'Не назначено'}  style={{ width: 230 }} onSelect={(value) => handleOnChangeFirst(value)} >
            {users.map((el, index) =>
              <Select.Option value={el.name} key={index} >{el.name}</Select.Option >
            )}
          </Select><br/>
          <Tag color="purple">2 место:</Tag>
          <Select value={editData.prize[1] || 'Не назначено'}  style={{ width: 230 }} onSelect={(value) => handleOnChangeSecond(value)} >
            {users.map((el, index) =>
              <Select.Option value={el.name} key={index} >{el.name}</Select.Option >
            )}
          </Select><br/>
          <Tag color="purple">3 место:</Tag>
          <Select value={editData.prize[2] || 'Не назначено'}  style={{ width: 230 }} onSelect={(value) => handleOnChangeThird(value)} >
            {users.map((el, index) =>
              <Select.Option value={el.name} key={index} >{el.name}</Select.Option >
            )}
          </Select>
        </Modal>
      </div>
    </>
  );
};

export default AdminEvents;