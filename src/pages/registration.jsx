import {SignUp} from '../components/SignUp';
import { Link } from 'react-router-dom';

const Registration = () => {
    return (
        <>

            <div className="content">

                <div className="registration">
                    <div>
                        <h1>Регистрация</h1>
                        <SignUp />
                        <h3>
                            У вас уже есть аккаунт? <Link to="/login">Войти</Link>
                        </h3>
                    </div>
                </div>


            </div>
            <div className="bottom">

            </div></>

    )
}

export {Registration}