import {Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { useAuth } from '../hooks/use-auth';
import {removeUser} from '../store/slices/userSlice'
import {Cart} from "../components/Cart";
import Card from "../components/Card";
import {useNavigate} from "react-router-dom";




const HomePage = () => {

    const navigate = useNavigate();

    const navigateToWatch = () => {
        navigate('../watch');
    };

    const dispatch = useDispatch();

    const {isAuth, email} = useAuth();

    return isAuth ? (
        <>



            <div className="content">

        <div>
            <h1>Ваш личный кабинет</h1>

            <div className="title">
                <h4>МОИ КУРСЫ</h4>
            </div>

            <div className="course-columns">
                <Card ImageUrl="/img/course3.svg" onClick={navigateToWatch} width={280} height={200}/>
                <Card ImageUrl="/img/course6.svg" onClick={navigateToWatch} width={280} height={200}/>
                <Card ImageUrl="/img/course7.svg" onClick={navigateToWatch} width={280} height={200}/>

            </div>


            <button className="telegram" >
                <a href="https://t.me/sdfsfssjgdtrdtr45fdbot"><img height={55} width={55} src="/img/tg.png"/></a>
                <h3></h3>
            </button>


        </div>

            </div>


        </>

    ) : (
        <Navigate to="/login" />
    )


}

export {HomePage}
