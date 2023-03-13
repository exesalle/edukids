import Card from "../../components/Card";
import MainImage from "../../components/MainImage";

const Russian = () => {
    return (
        <>
            <MainImage/>
            <div className="content">
                <h1>Русский язык</h1>

                <a name="courses"></a>
                <div className="course-columns">

                    <Card ImageUrl="/img/mental2.png" width={280} height={280}/>
                    <Card ImageUrl="/img/eng2.png" width={280} height={280}/>
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

export {Russian}