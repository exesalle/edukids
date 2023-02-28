import Card from "../../components/Card";

const Reading = () => {
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
                <h1>Почему именно занятия по чтению и развитию интеллекта?</h1>

                <a name="courses"></a>
                <div className="course-columns">
                    <Card ImageUrl="/img/read1.png" width={280} height={280}/>
                    <Card ImageUrl="/img/read2.png" width={280} height={280}/>
                    <Card ImageUrl="/img/read3.png" width={280} height={280}/>
                </div>

            </div>
            <div className="Buy">
                <h4>ОПЛАТИТЬ</h4>
            </div>
            <div className="bottom">

            </div></>
    )
}

export {Reading}