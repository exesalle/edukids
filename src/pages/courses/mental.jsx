import Card from "../../components/Card";
import MainImage from "../../components/MainImage";


const Mental = () => {

    return (
        <>
            <MainImage/>
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