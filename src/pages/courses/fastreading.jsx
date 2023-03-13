import Card from "../../components/Card";
import MainImage from "../../components/MainImage";

const Fastreading = () => {
    return (
        <>
            <MainImage/>
            <div className="content">
                <h1>Скорочтение</h1>

                <a name="courses"></a>
                <div className="course-columns">
                    <Card ImageUrl="/img/prog1.png" width={280} height={280}/>
                    <Card ImageUrl="/img/mental2.png" width={280} height={280}/>
                    <Card ImageUrl="/img/prog3.png" width={280} height={280}/>
                </div>

            </div>
            <div className="Buy">
                <h4>ОПЛАТИТЬ</h4>
            </div>
            <div className="bottom">

            </div></>
    )
}

export {Fastreading}