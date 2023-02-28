import {Login} from '../components/Login';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <>


            <div className="content">

                <div className="registration">
                    <div>
                        <h1>Вход</h1>
                        <Login />
                        <h3>
                            Нет аккаунта? <Link to="/registration">Зарегистрируйтесь</Link>
                        </h3>
                    </div>
                </div>


            </div>


        </>
    )
}

export {LoginPage}