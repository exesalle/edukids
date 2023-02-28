import {Link, Outlet, useNavigate} from 'react-router-dom'
import {Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { useAuth } from '../hooks/use-auth';
import {removeUser} from '../store/slices/userSlice'
import {LogBtn} from "./LogBtn";


const Header = () => {
    const dispatch = useDispatch();


    const navigate = useNavigate();


    const navigateToLogin = () => {
        navigate('login');
    };
    const navigateToHome = () => {
        navigate('/');
    };


    return (


        <>
            <header className="header">
                <div className="headerLeft" onClick={navigateToHome}>
                    <img height={65} width={65} src="/img/logo.png"/>
                    <div className="headerInfo">
                        <h2><span style={{color: "#232323"}}>EDU</span><span style={{color: "#F6931E"}}>KIDS</span></h2>
                    </div>
                    <div className="headerInfo">
                        <h3>ГЛАВНАЯ</h3>

                    </div>
                </div>



                <LogBtn />
            </header>


            <Outlet/>

        </>



    )
    const {isAuth, email} = useAuth();
    return isAuth ? (
        <>


            <div className="content">
                <div>
                    <h1>Welcome</h1>

                    <button
                        onClick={()=> dispatch(removeUser())}
                    >Log out from {email}</button>
                </div>
            </div>


        </>

    ) : (
        <Navigate to="/login" />
    )

}

export {Header}