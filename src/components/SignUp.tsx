import React, {useEffect} from 'react';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {FC, useState} from 'react';
import {ICoursesData, InitialCourses, IUserData} from '../Types';
import {useNavigate} from 'react-router-dom';
import {addDoc, collection, getDocs, getFirestore, query} from 'firebase/firestore';

type Props = {
  teacher: boolean
}
const SignUp:React.FC<Props> = (props, context) => {

  const db = getFirestore();
  const [coursesData, setCoursesData] = useState<ICoursesData[]>(InitialCourses);

  useEffect(() => {
    const displayCollections = async () => {
      const coursesCollection = query(collection(db, 'courses'));
      const coursesSnapshot = await getDocs(coursesCollection);
      await coursesSnapshot.forEach((doc:any) => {
        setCoursesData(prev => [...prev, doc.data()]);
      });

    };
    return () => {
      displayCollections();
    };
  }, []);

  const [userData,setUserData] = useState<IUserData>({
    email: '',
    password: '',
    name: ''
  } as IUserData);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectCourse, setSelectCourse] = useState('');
  const [error,setError] = useState('');

  const push = useNavigate();
  const handleRegister = async () => {
    const auth = getAuth();
    try {
      const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      await updateProfile(res.user,{
        displayName: userData.name
      });
      if (!props.teacher) {push('/user/profile');} else {push('/admin/teachers');}
    } catch (error:any){
      error.message && setError(error.message);
    }
  };

  const registerTeacher = () => {
    setUserData({...userData, password: '123456'});
    setConfirmPassword('123456');
    validatePassword();
    addTeacher();
  };

  const addTeacher = async () => {
    try {
      await addDoc(collection(db, 'teachers'), {
        id: Date.now(),
        name: userData.name,
        course: selectCourse

      });
    } catch (e) {
      console.log(e);
    }
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
          <button className="signUp"
            onClick={validatePassword}
          >РЕГИСТРАЦИЯ</button>
        </>):<>
          <input className="input"
            type="text"
            placeholder="Пароль: 123456"
            readOnly
          />
          <select onChange={(e) => setSelectCourse(e.target.value)}>
            {coursesData.map(el =>
              <option key={el.id} >{el.name}</option>
            )}
          </select>
          <p>{error && <p>{error}</p>}</p>
          <button className="signUp"
            onClick={registerTeacher}
          >РЕГИСТРАЦИЯ</button>
        </>}
    </>
  );
};

export {SignUp};
