import React, {useEffect} from 'react';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {useState} from 'react';
import {ICoursesData, InitialCourses, IUserInfo} from '../Types';
import {useNavigate} from 'react-router-dom';
import {addDoc, collection, getDocs, getFirestore, query} from 'firebase/firestore';
import {Button, Select} from 'antd';
import {useSelector} from 'react-redux';
import {RootState, useStoreDispatch} from '../store/store';
import {signUpUser} from '../store/signUpSlice';
import uuid from 'react-uuid';


type Props = {
  teacher: boolean
}
const SignUp:React.FC<Props> = (props, context) => {

  const db = getFirestore();
  const [coursesData, setCoursesData] = useState<ICoursesData[]>(InitialCourses);
  const dispatch = useStoreDispatch();

  const courses = useSelector((state:RootState)=> state.courses.courses);

  const [userData,setUserData] = useState<IUserInfo>({
    email: '',
    password: '123456',
    name: '',
    course: [],
    id: Date.now()
  } as IUserInfo);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectCourse, setSelectCourse] = useState('');
  const [error,setError] = useState('');

  const push = useNavigate();
  const handleRegister = () => {
    dispatch(signUpUser(userData, push, props.teacher));
  };

  const registerTeacher = () => {
    //setUserData({...userData, password: '123456', course: selectCourse});
    setConfirmPassword('123456');
    handleRegister();
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

  const handleOnChangeCourse = (value:string) => {
    setSelectCourse(value);
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
          <Select placeholder="Направление"   style={{ width: 300 }} onSelect={(value) => handleOnChangeCourse(value)} >
            {courses.map(el =>
              <Select.Option value={el.name} key={el.id} >{el.name}</Select.Option >
            )}
          </Select>
          <p>{error && <p>{error}</p>}</p>
          <Button className="signUp" type="primary" onClick={handleRegister}>ЗАРЕГИСТРИРОВАТЬ ПРЕПОДАВАТЕЛЯ</Button>
        </>}
    </>
  );
};

export {SignUp};
