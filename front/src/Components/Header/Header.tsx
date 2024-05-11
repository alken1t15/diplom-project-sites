import React, {useEffect, useState} from 'react';

import './Header.scss';
import {
    CART_PAGE_ROUTE,
    CONTACTS_PAGE_ROUTE,
    FAVOURITES_PAGE_ROUTE,
    PROFILE_PAGE_ROUTE,
    SHOP_PAGE_ROUTE
} from "../../Utils/Routes";

import {ReactComponent as shopImg} from "../../assets/images/cookie.svg";
import {ReactComponent as cartImg} from "../../assets/images/cart.svg";
import {ReactComponent as contactImg} from "../../assets/images/ping.svg";
import {ReactComponent as profileImg} from "../../assets/images/profile.svg";
import {ReactComponent as favImg} from "../../assets/images/fav.svg";
import {Link, Outlet} from "react-router-dom";
import item from "../Item/Item";

const logoImg = require('../../assets/images/Logo.svg').default;
const bonusImg = require('../../assets/images/bonus.png');

const Header: React.FC = () => {
    let[items, setItems] = useState([
        {
            name: 'Меню',
            active: true,
            link: SHOP_PAGE_ROUTE,
            img: shopImg
        },
        {
            name: 'Контакты',
            active: false,
            link: CONTACTS_PAGE_ROUTE,
            img: contactImg
        },
        {
            name: 'Избранное',
            active: false,
            link: FAVOURITES_PAGE_ROUTE,
            img: favImg
        },
        {
            name: 'Корзина',
            active: false,
            link: CART_PAGE_ROUTE,
            img: cartImg
        },
        {
            name: 'Профиль',
            active: false,
            link: PROFILE_PAGE_ROUTE,
            img: profileImg
        },


    ]);
    let[bonus, setBonus] = useState(0)

    useEffect(()=>{
        let newArr = items.map((el, index)=>{
            el.active = el.link === window.location.href.split('3000')[1];
            return el
        })

        setItems(newArr)


    }, [])
    return (
       <div>
           <header>
               <div className="container container-header">
                   <div className="logo">
                       <img src={logoImg} alt="Bites logo" className="logo__img"/>
                   </div>
                   <div className="header-right">
                       <nav className="navbar">
                           {items.map((el, index)=>(
                               <button key={index} style={{display: 'inline-block', background: "transparent", border: 'none'}} onClick={(e)=>{
                                   let newArr = items.map((el, index)=>{
                                       el.active = el.link === window.location.href.split('3000')[1];
                                       return el
                                   })

                                   setItems(newArr)
                               }}>
                                   <Link to={el.link} className={`navbar-item`} key={index}>
                                       {React.createElement(el.img, {
                                           className: `navbar-item__img
                                    ${el.active ? 'navbar-item__img-active' : ''}`
                                       })}
                                       <p className={`navbar-item__text ${el.active ? 'navbar-item__text-active' : ''}`}>{el.name}</p>
                                   </Link>
                               </button>
                           ))}
                       </nav>
                       <div className="bonus">
                           <p className="bonus__text">{bonus}</p>
                           <img className={`bonus__img`} src={bonusImg} alt="Bonus img"/>
                       </div>
                   </div>
               </div>
           </header>
           <Outlet/>
       </div>
    );
};

export default Header;