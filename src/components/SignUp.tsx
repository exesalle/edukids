import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {FC, useState} from "react";
import {IUserData} from "../Types";


const SignUp:FC = () => {
  const [userData,setUserData] = useState<IUserData>({
    email: '',
    password: ''
  } as IUserData)

  const [confirmPassword, setConfirmPassword] = useState('')
  const [error,setError] = useState('')


    const handleRegister = async () => {
      const auth = getAuth();
      try {
        await createUserWithEmailAndPassword(auth, userData.email, userData.password)
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
