import {useDispatch} from "react-redux";
import {useAuth} from "../hooks/use-auth";
import {Navigate} from "react-router-dom";


const Watch = () => {

    const dispatch = useDispatch();

    const {isAuth, email} = useAuth();

    return isAuth ? (
        <>

            <div className="content">
                <h1></h1>

                <div className="trans">
                    <img height={494} width={380} src="/img/loading.gif"/>
            </div>
                <h5>ПРЕПОДАВАТЕЛЬ ЕЩЕ НЕ ЗАПУСТИЛ ТРАНСЛЯЦИЮ</h5>


            </div>
            <div className="Buy">
                <h4></h4>
            </div>
            <div className="bottom">

            </div></>
    ) : (
        <Navigate to="/login" />
    )
}

export {Watch}