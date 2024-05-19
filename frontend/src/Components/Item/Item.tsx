import React, {useEffect, useState} from 'react';


import './Item.scss'

import {ReactComponent as imgFav} from "../../assets/images/itemFav.svg";
export interface IItem{
    isFav: boolean;
    name: string;
    price: string;
    img: any;
    onClick: (index: number) => void;
    index: number;
    addToCartF: (index: number) => void;
}
const Item: React.FC<IItem> = (props) => {
    let[isFav, setIsFav] = useState(props.isFav)
    let[name, setName] = useState(props.name)
    let[price, setPrice] = useState(props.price)
    let[index, setIndex] = useState(props.index)
    let[img, setImg] = useState(props.img)

    useEffect(()=>{
        setIsFav(props.isFav)
        setName(props.name)
        setPrice(props.price)
        setIndex(props.index)
        console.log(props.img)
        // const url = URL.createObjectURL(props.img);
        // setImg(url);

        // return () => {
        //     URL.revokeObjectURL(url);
        // };
    }, [props])

    return (
        <div className={'item'}>
            <img src={img} alt="" className="item__img"/>
            <p className="item__text">{name}</p>
            <p className="item__price">{price} ₸</p>
            <div className="item-bot">
                <button className="item-bot-fav" onClick={(e)=>{
                    e.stopPropagation();
                    props.onClick(index)
                }}>
                    {React.createElement(imgFav, {
                        className: `item-bot-fav__img
                                    ${isFav ? 'item-bot-fav__img-a' : ''}`
                    })}
                </button>
                <button className="item-bot-add" onClick={(e)=>{
                    e.stopPropagation();
                    props.addToCartF(index)
                }}>
                    +
                </button>
            </div>
        </div>
    );
};

export default Item;