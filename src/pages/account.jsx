import Card from "../components/Card";
import {useNavigate} from "react-router-dom";


const Account = () => {

    const navigate = useNavigate();

    const navigateToReading = () => {
        navigate('reading');
    };

    const navigateToProgramming = () => {
        navigate('programming');
    };

    const navigateToMath = () => {
        navigate('math');
    };

    const navigateToDrawing = () => {
        navigate('drawing');
    };

    const navigateToEnglish = () => {
        navigate('english');
    };

    const navigateToFastreading = () => {
        navigate('fastreading');
    };

    const navigateToMental = () => {
        navigate('mental');
    };

    const navigateToRussian = () => {
        navigate('russian');
    };

    const navigateToSchool = () => {
        navigate('school');
    };

    return (
        <>
            <div className="main">
                <div className="main-text">
                    <h3 style={{color: "#232323"}}>ВАШ ЛИЧНЫЙ КАБИНЕТ</h3>
                </div>
            </div>


            <div className="content">
                <div className="title">
                    <h4>ВАШИ КУРСЫ</h4>
                </div>
                <a name="courses"></a>
                <div className="course-columns">
                    <Card ImageUrl="/img/course1.svg" onClick={navigateToReading} width={280} height={200}/>
                    <Card ImageUrl="/img/course2.svg" onClick={navigateToMath} width={280} height={200}/>


                </div>

            </div>
            <div className="bottom">

            </div></>
    )
}

export {Account}