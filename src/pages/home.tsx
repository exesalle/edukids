
import React from 'react';
import './home.scss';
import {LogBtn} from '../components/LogBtn';

const Home = () => {

  return (
    <>
      <div style={{display: 'block',   width: '1200px', marginLeft: 150}}>
        <div className="main-m">
          <img alt="df" src="/img/main.svg" />
          <div className="main-text">
            <span style={{color: '#232323'}}>EDU</span><span style={{color: '#F6931E'}}>KIDS</span>
            <h2 style={{color: '#232323'}}>ЦЕНТР ДЕТСКОГО ТВОРЧЕСТВА</h2>
            <LogBtn/>
          </div>

        </div>
        <div className="content">
          <div className="title">
            <h4>НАШИ КУРСЫ</h4>
          </div>

          <div className="course-columns">
            <img  alt="1" width={280} height={200} src="/img/course3.svg" />
            <img  alt="1" width={280} height={200} src="/img/course4.svg" />
            <img  alt="1" width={280} height={200} src="/img/course5.svg"/>
            <img  alt="1" width={280} height={200} src="/img/course6.svg"/>
            <img  alt="1" width={280} height={200} src="/img/course7.svg"/>
            <img  alt="1" width={280} height={200} src="/img/course8.svg"/>
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
          {/*<details>*/}
          {/*  <summary><h2>Как записаться на занятие?</h2></summary>*/}
          {/*  /!*<h4>— Записаться можно через <a href="https://"></a></h4>*!/*/}
          {/*</details>*/}
        </div>
        <div className="bottom">

        </div>
      </div>
    </>
  );
};

export default Home;