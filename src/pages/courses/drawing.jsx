import Card from "../../components/Card";
import MainImage from "../../components/MainImage";

const Drawing = () => {
    return (
        <>
            <MainImage/>

            <div className="content">
                <h1>Основы академического рисунка</h1>
                <a name="courses"></a>
                <div className="course-columns">
                    <Card ImageUrl="/img/draw1.png" width={280} height={280}/>
                    <Card ImageUrl="/img/draw2.png" width={280} height={280}/>
                    <Card ImageUrl="/img/draw3.png" width={280} height={280}/>
                </div>
            </div>
            <div className="Buy">
                <h4>ОПЛАТИТЬ</h4>
            </div>
            <div className="bottom">

            </div>
        </>
    )
}

export {Drawing}