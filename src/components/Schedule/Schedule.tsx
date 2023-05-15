import React, {useEffect, useState } from 'react';
import { ILesson } from '../../Types';
import SelectedLesson from '../SelectedLesson/SelectedLesson';
import {Button, Calendar} from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {useAuthState} from 'react-firebase-hooks/auth';
import {getAuth} from 'firebase/auth';
import {RootState, useStoreDispatch} from '../../store/store';
import {getLessons} from '../../store/scheduleSlice';
import {useSelector} from 'react-redux';

const Schedule: React.FC = () => {

  const auth = getAuth();
  const [user] = useAuthState(auth);
  const [date, setDate] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState<ILesson>({} as ILesson);
  const [modalState, setModalState] = useState(false);
  const dispatch = useStoreDispatch();
  const lessons = useSelector((state:RootState)=> state.schedule.schedule);

  useEffect(() => {
    dispatch(getLessons(user?.displayName || ''));
    console.log(lessons);
  }, []);

  const dateCellRender = (value: Dayjs) => {
    const stringValue = value.format('DD-MM-YYYY');
    const listData = lessons.filter(({date})=> date === stringValue);
    return (
      <ul className="events">
        {listData.map((item: ILesson) => (
          <Button style={{width: '100%', overflow:'hidden'}} key={item.title} onClick={(e) => onSelectEvent(item)}>
            {item.title}
          </Button>
        ))}
      </ul>
    );
  };

  const onSelectEvent = (event: ILesson) => {
    setSelectedEvent(event);
    setModalState(true);
  };

  const onSelect = (day: Dayjs) => {
    setDate(day);
  };



  return <div>
    {modalState ?
      <SelectedLesson selectedEvent={selectedEvent} setModalState={setModalState}/> : null}
    <Calendar value={date} onSelect={(e) => onSelect(e)} cellRender={dateCellRender} />
  </div>;
};

export default Schedule;
