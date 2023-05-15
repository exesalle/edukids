import React from 'react';
import {useState} from 'react';
import {ICoursesData, InitialCourses, IUserInfo} from '../Types';
import {useNavigate} from 'react-router-dom';
import {getFirestore} from 'firebase/firestore';
import {Button} from 'antd';
import {useSelector} from 'react-redux';
import {RootState, useStoreDispatch} from '../store/store';
import {signUpUser} from '../store/signUpSlice';


type Props = {
  teacher: boolean
}
const SignUp:React.FC<Props> = (props) => {

  const dispatch = useStoreDispatch();

  const [userData,setUserData] = useState<IUserInfo>({
    password: '123456',
    isTeacher: props.teacher
  } as IUserInfo);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [error,setError] = useState('');

  const push = useNavigate();
  const handleRegister = () => {
    dispatch(signUpUser(userData, push, props.teacher));
  };

  const validatePassword = () => {
    setError('');
    if (userData.email !==''){
      if (userData.password !== '' && confirmPassword !== ''){
        if (userData.password !== confirmPassword) {
          setError('Пароли не совпадают');
        } else {
          handleRegister();
        }
      }
    } else {
      setError('Введите email');
    }
  };

  
  return (
    <>
      <input className="input"
        type="name"
        value={userData.name}
        onChange={(e) => setUserData({...userData, name: e.target.value})}
        placeholder="ФИО"
      />
      <input className="input"
        type="email"
        value={userData.email}
        onChange={(e) => setUserData({...userData, email: e.target.value})}
        placeholder="Email"
      />
      {!props.teacher ?
        (<>
          <input className="input"
            type="password"
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})}
            placeholder="Пароль"
          />
          <input className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повторите пароль"
          />
          <p>{error && <p>{error}</p>}</p>
          <Button className="signUp" type="primary" onClick={validatePassword}>РЕГИСТРАЦИЯ</Button>
        </>):<>
          <input className="input"
            type="text"
            placeholder="Пароль: 123456"
            readOnly
          />
          {/*<Select placeholder="Направление"   style={{ width: 300 }} onSelect={(value) => handleOnChangeCourse(value)} >*/}
          {/*  {courses.map(el =>*/}
          {/*    <Select.Option value={el.name} key={el.id} >{el.name}</Select.Option >*/}
          {/*  )}*/}
          {/*</Select>*/}
          <p>{error && <p>{error}</p>}</p>
          <Button className="signUp" type="primary" onClick={handleRegister}>ЗАРЕГИСТРИРОВАТЬ ПРЕПОДАВАТЕЛЯ</Button>
        </>}
    </>
  );
};

export {SignUp};
