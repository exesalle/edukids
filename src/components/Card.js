import {useNavigate} from 'react-router-dom';
import React from 'react';
import {Button} from 'antd';


function Card(props) {
  const navigate = useNavigate();
 
  const navigateToReading = () => {
    navigate('reading');
  };

  const navigateToProgramming = () => {
    navigate('programming');
  };

  const navigateToMath = () => {
    navigate('math');
  };

  const navigateToDrawing = () => {
    navigate('drawing');
  };

  const navigateToEnglish = () => {
    navigate('english');
  };

  const navigateToFastreading = () => {
    navigate('fastreading');
  };

  const navigateToMental = () => {
    navigate('mental');
  };

  const navigateToRussian = () => {
    navigate('russian');
  };

  const navigateToSchool = () => {
    navigate('school');
  };


  return (
    <>
      <div className="course-card">
        {/* eslint-disable-next-line react/prop-types */}
        <img alt="1" width={280} height={200} src={props.ImageUrl}/>
      </div>
    </>
  );
}

export default Card;
