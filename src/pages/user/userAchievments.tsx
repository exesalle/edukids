import React, {useEffect} from 'react';
import {RootState, useStoreDispatch} from '../../store/store';
import {useSelector} from 'react-redux';
import {Table, Tag} from 'antd';
import { getEvents} from '../../store/eventsSlice';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {IEventsData} from '../../Types';
import uuid from 'react-uuid';
import {getUsers} from '../../store/usersSlice';
import UserMenu from '../../components/UserMenu';
import {auth} from '../../firebase';

const UserAchievments = () => {
  dayjs.extend(customParseFormat);
  const user = auth.currentUser;

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
      title: 'Призовое место',
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
  ];

  const dispatch = useStoreDispatch();
  const events = useSelector((state:RootState)=> state.events.events);

  useEffect(() => {
    return () => {
      dispatch(getEvents());
      dispatch(getUsers());
    };
  }, [dispatch]);

  return (
    <>
      <UserMenu/>
      <div className="main-screen">
        <Table columns={columns} dataSource={(Object.values(events).filter((event) => event.prize.includes(user?.photoURL || '')))} rowKey={uuid}  />
      </div>
    </>
  );
};
export default UserAchievments;