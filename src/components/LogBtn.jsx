import {Navigate, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { useAuth } from '../hooks/use-auth';
import {removeUser} from '../store/slices/userSlice'

const LogBtn = () => {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('login');
    };
    const navigateToRegistration = () => {
        navigate('registration');
    };
    const navigateToAccount = () => {
        navigate('homepage');
    };

    const dispatch = useDispatch();

    const {isAuth, email} = useAuth();

    return isAuth ? (
        <>


            <div className="headerRight">

                <div className="signUp" onClick={navigateToAccount}>
                    <img height={35} width={35} src="/img/lk.png"/>
                </div>


                    <div className="loginBtn"
                        onClick={()=> dispatch(removeUser())}
                    ><h4 color="#FAFAFA">ВЫЙТИ ИЗ {email}</h4></div>

            </div>


        </>

    ) : (
        <div className="headerRight">
            <div className="signUp" onClick={navigateToRegistration}>
                <h4>РЕГИСТРАЦИЯ</h4>
            </div>

            <div className="loginBtn" onClick={navigateToLogin}>
                <h4 color="#FAFAFA">ВХОД</h4>
            </div>

        </div>
    )


}

export {LogBtn}