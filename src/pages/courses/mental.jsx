import Card from "../../components/Card";


const Mental = () => {

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
                <h1>Почему именно занятия по ментальной арифметике?</h1>

                <a name="courses"></a>
                <div className="course-columns">
                    <Card ImageUrl="/img/mental1.png" width={280} height={280}/>
                    <Card ImageUrl="/img/mental2.png" width={280} height={280}/>
                    <Card ImageUrl="/img/mental3.png" width={280} height={280}/>
                </div>

            </div>
            <div className="Buy">
                <h4>ОПЛАТИТЬ</h4>
            </div>


            <div className="bottom">

            </div>

            <div>


            </div>
        </>

    )
}

export {Mental}