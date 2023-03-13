import Card from "../../components/Card";
import MainImage from "../../components/MainImage";

const Reading = () => {
    return (
        <>
            <MainImage/>
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