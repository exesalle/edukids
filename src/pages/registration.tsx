import {SignUp} from '../components/SignUp';
import { Link } from 'react-router-dom';

const Registration = () => {
    return (
        <>
        <div className="auth">
          <h1>Регистрация</h1>
          <SignUp />
          <p>
            У вас уже есть аккаунт? <Link to="/login">Войти</Link>
          </p>
        </div>
        </>
    )
}

export {Registration}