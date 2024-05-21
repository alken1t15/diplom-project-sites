import React, {useState} from 'react';
import './StartPage.scss'
import {useNavigate} from "react-router-dom";
import {SHOP_PAGE_ROUTE, SIGN_IN_ROUTE} from "../../Utils/Routes";
const fImage = require('../../assets/images/StartPage1.svg').default
const sImage = require('../../assets/images/StartPage2.svg').default
const thImage = require('../../assets/images/StartPage3.svg').default
const StartPage: React.FC = () => {
    const [slides, setSlides] = useState([
        {
            active: true,
            image: fImage,
            title: 'Добро пожаловать в Bites!',
            text: 'Мы рады приветствовать вас в мире вкусных десертов, ароматного кофе и неповторимых сладких радостей.',
            btnText: 'Продолжить'
        },
        {
            active: false,
            image: sImage,
            title: 'Удобный способ заказа',
            text: 'Вы можете выбрать в приложении любой способ получения заказа: доставка, самовывоз или в зале!',
            btnText: 'Продолжить'
        },
        {
            active: false,
            image: thImage,
            title: 'Программа лояльности',
            text: 'Каждый ваш заказ приносит вам бонусные баллы, которые можно потратить на другие вкусности!',
            btnText: 'Вперед за сладостями!'
        },
    ]);
    const [activeIndex, setActiveIndex] = useState(0);
    let navigator = useNavigate();

    const handleClick = () => {
        const nextIndex = (activeIndex + 1) % slides.length;
        if(nextIndex === 0){
            navigator(SIGN_IN_ROUTE)
        }
        setActiveIndex(nextIndex);
    };

    return (
        <div className="slider-container">
            <div className="slider-img-container">
                <img src={slides[activeIndex].image} alt="" className="start-page-img" />
            </div>
            <div className="slider-btns">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slider-btn ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
            <p className="slider-title">
                {slides[activeIndex].title}
            </p>
            <p className="slider-text">{slides[activeIndex].text}</p>
            <button className="slider-main-btn" onClick={handleClick}>{slides[activeIndex].btnText}</button>
        </div>
    );
};

export default StartPage;