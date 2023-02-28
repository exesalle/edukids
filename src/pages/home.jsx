import Card from "../components/Card";
import {useNavigate} from "react-router-dom";
import Product from "../components/Product";
import {products} from "../../src/data"

const Home = () => {

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
                <img src="/img/main.svg" />
                <div className="main-text">
                    <span style={{color: "#232323"}}>EDU</span><span style={{color: "#F6931E"}}>KIDS</span>
                    <h2 style={{color: "#232323"}}>ОБРАЗОВАТЕЛЬНЫЙ ОНЛАЙН-ЦЕНТР ИНТЕЛЛЕКТУАЛЬНОГО И ТВОРЧЕСКОГО РАЗВИТИЯ ДЛЯ ДЕТЕЙ ОТ 4-12 ЛЕТ</h2>
                </div>

            </div>
            <div className="content">
                <div className="title">
                    <h4>НАШИ КУРСЫ</h4>
                </div>
                <a name="courses"></a>
                <div className="course-columns">
                    <Card ImageUrl="/img/course3.svg" onClick={navigateToMental} width={280} height={200}/>
                    <Card ImageUrl="/img/course4.svg" onClick={navigateToProgramming} width={280} height={200}/>
                    <Card ImageUrl="/img/course5.svg" onClick={navigateToRussian} width={280} height={200}/>
                    <Card ImageUrl="/img/course6.svg" onClick={navigateToSchool} width={280} height={200}/>
                    <Card ImageUrl="/img/course7.svg" onClick={navigateToEnglish} width={280} height={200}/>
                    <Card ImageUrl="/img/course8.svg" onClick={navigateToFastreading} width={280} height={200}/>




                </div>


                <h1>Частые вопросы</h1>

                <details>
                    <summary><h2>Главные преимущества онлайн занятий?</h2></summary>
                    <h4>— Доступность педагогов. Вы можете находиться в Нью-Йорке или Пекине, а заниматься с педагогом из Москвы. Не надо ограничиваться предложениями в вашем районе или городе.
                        <br/><br/>
                        — Эффективные методики. Онлайн-формат позволяет использовать новейшие инструменты для развития мозга ребенка.
                        <br/><br/>
                        — Мобильность. Занимайтесь где угодно и когда угодно по своему расписанию.</h4>
                </details>
                <details>
                    <summary><h2>Кому подойдут онлайн занятия?</h2></summary>
                    <h4>— Всем современным детям. Такая форма обучения очень эффективна и сбалансирована. Она может дополнять очные занятия (детский сад или развивающий центр)</h4>
                </details>
                <details>
                    <summary><h2>Как записаться на занятие?</h2></summary>
                    <h4>— Записаться можно через <a href="https://t.me/sdfsfssjgdtrdtr45fdbot">Telegram-бота</a></h4>
                </details>


            </div>


            <button className="telegram" >
                <a href="https://t.me/sdfsfssjgdtrdtr45fdbot"><img height={55} width={55} src="/img/tg.png"/></a>
                <h3></h3>
            </button>

            <div className="bottom">


            </div></>
    )
}

export {Home}