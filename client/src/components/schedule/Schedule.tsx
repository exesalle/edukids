
import React, { useContext, useEffect, useState } from 'react';
import { IMeeting } from '../../Types';
import SelectedMeeting from '../../components/SelectedMeeting/SelectedMeeting';
import './react-big-calendar.css';

import {Alert, Button, Calendar, Row} from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const Schedule: React.FC = () => {

  const [date, setDate] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState<IMeeting>({} as IMeeting);
  const [modalState, setModalState] = useState(false);

  // const month = [
  //   'Январь', 'Февраль', 'Март', 'April', 'May', 'June', 'July',
  //   'August', 'September', 'October', 'November', 'December'
  // ];

  const data = [
    {
      title: 'Занятие 1',
      date: '22-04-2023',
      start: '14-00',
      end: '15:00',
      participants: [],
      id: 'string',
    },
    {
      title: 'Занятие 2',
      date: '22-04-2023',
      start: '14-00',
      end: '15:00',
      participants: [],
      id: 'string',
    }
  ];

  // const [data, setData] = useState<IMeeting>
  // ( {
  //   title: 'string',
  //   date: '22/04/2023',
  //   start: '14-00',
  //   end: '15:00',
  //   participants: [],
  //   id: 'string',
  // });

  //
  // // const [value, setValue] = useState(() => dayjs());
  //  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  //
  //  const onSelect = (newValue: Dayjs) => {
  //    setValue(newValue);
  //    setSelectedValue(newValue);
  //  };
  //
  //  const onPanelChange = (newValue: Dayjs) => {
  //    setValue(newValue);
  //  };

  const dateCellRender = (value: Dayjs) => {
    const stringValue = value.format('DD-MM-YYYY');
    const listData = data.filter(({date})=> date === stringValue);
    return (
      <ul className="events">
        {listData.map((item) => (
          <Button style={{width: '100%', overflow:'hidden'}} key={item.title} onClick={(e) => onSelectEvent(item)}>
            {item.title}
          </Button>
        ))}
      </ul>
    );
  };

  const onSelectEvent = (event: IMeeting) => {
    setSelectedEvent(event);
    setModalState(true);
  };

  const onSelect = (day: Dayjs) => {
    setDate(day);
  };



  return <div>
    {modalState ?
      <SelectedMeeting selectedEvent={selectedEvent} setModalState={setModalState}/> : null}
    <Calendar value={date} onSelect={(e) => onSelect(e)} cellRender={dateCellRender} />
  </div>;
};

export default Schedule;
