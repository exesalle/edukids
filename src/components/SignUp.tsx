import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {FC, useState} from "react";
import {IUserData} from "../Types";
import {useNavigate} from "react-router-dom";


const SignUp:FC = () => {
  const [userData,setUserData] = useState<IUserData>({
    email: '',
    password: '',
    name: ''
  } as IUserData)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [error,setError] = useState('')

  const push = useNavigate()
    const handleRegister = async () => {
      const auth = getAuth();
      try {
        const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
        await updateProfile(res.user,{
          displayName: userData.name
        })
        await push('/user/profile')
      } catch (error:any){
        error.message && setError(error.message)
      }
    }

  const validatePassword = () => {
    setError('')
    if (userData.email !==''){
      if (userData.password !== '' && confirmPassword !== ''){
        if (userData.password !== confirmPassword) {
          setError('Пароли не совпадают')
        } else {
          handleRegister()
        }
      }
    } else {
      setError('Введите email')
    }
  }


  return (
      <>
        <input
          type="name"
          value={userData.name}
          onChange={(e) => setUserData({...userData, name: e.target.value})}
          placeholder="ФИО"
        />
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({...userData, email: e.target.value})}
          placeholder="Email"
        />
        <input
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({...userData, password: e.target.value})}
          placeholder="Пароль"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Повторите пароль"
        />
        <p>{error && <p>{error}</p>}</p>
          <button className="signUp"
            onClick={validatePassword}
          >РЕГИСТРАЦИЯ</button>
      </>
    )
}

export {SignUp}
