import React, { useContext, useState } from 'react';
import AppContext from '../../providers/AppContext';
import {ILesson, ScheduleLessonProps} from '../../Types';
import {Button, DatePicker, DatePickerProps, Input, TimePicker} from 'antd';
import {useStoreDispatch} from '../../store/store';
import {addLesson} from '../../store/scheduleSlice';

const ScheduleLesson = ({ currentChat }: ScheduleLessonProps): JSX.Element => {
  const { setIsMeetingClicked } = useContext(AppContext);

  const dispatch = useStoreDispatch();
  const [lesson, setLesson] = useState<ILesson>({participants: currentChat.participants} as ILesson);

  const handleCreateMeeting = () => {
    dispatch(addLesson(lesson));
    setIsMeetingClicked(false);
  };

  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    setLesson({...lesson, date: dateString});
  };

  return (
    <div>
      <h4>Создание занятия:</h4>
      <br />
      <div>
        <Input className="meeting-info" type="text" required placeholder="Название" value={lesson.title} onChange={(e) => setLesson({...lesson, title: e.target.value})} />
        <DatePicker placeholder="Дата" className="meeting-info" format="DD-MM-YYYY" onChange={onChangeDate} />
        <TimePicker
          className="meeting-info"
          placeholder="Время"
          minuteStep={5}
          hourStep={1}
          format={'HH:mm'}
          onChange={(value, dateString) => {setLesson({...lesson, start: dateString});}}/>
        <Button onClick={handleCreateMeeting} className="meeting-info">Создать</Button>
      </div>
    </div>
  );
};

export default ScheduleLesson;
