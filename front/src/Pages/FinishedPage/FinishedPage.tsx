import React from 'react';

import './FinishedPage.scss'
import {Link} from "react-router-dom";
import {SHOP_PAGE_ROUTE} from "../../Utils/Routes";

const finImg = require('../../assets/images/Order-Delivered--Streamline-Djakarta.png');
const FinishedPage: React.FC = () => {
    return (
        <div className={'container finished-container'}>
            <img src={finImg} alt="" className="finished-container__img"/>
            <p className="finished-container__title">Благодарим за заказ!</p>
            <p className="finished-container__text">Ваш заказ будет доставлен в выбранное время</p>
            <a href={'http://localhost:3000/main/shop'} className="finished-container__btn">Перейти на главную страницу</a>
        </div>
    );
};

export default FinishedPage;