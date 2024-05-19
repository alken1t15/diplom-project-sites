import React, {useEffect, useState} from 'react';

import './CartItem.scss'

interface ICartItem{
    id: number;
    count: number;
    name: string;
    img: any;
    price: number;
    onChange: (count: number, id: number) => void;
}
const CartItem: React.FC<ICartItem> = (props) => {
    let[count, setCount] = useState(props.count)

    useEffect(()=>{
        props.onChange(count, props.id)
    }, [count])

    return (
        <div className={`cart-item`}>
            <div className="cart-item-l">
                <img src={props.img} alt={props.name + ' image'} className="cart-item-l__img"/>
            </div>
            <div className="cart-item-r">
                <p className="cart-item-r__title">
                    {props.name}
                </p>
                <div className="cart-item-r-bot">
                    <div className="cart-item-count-box">
                        <button className={`item-bot-add-in cart-item-count-box-button`}

                                onClick={(e)=>{
                                    e.stopPropagation()
                                    setCount((prevState: number)=>prevState-1)

                                }}

                        >-</button>
                        <span className="count-block__text cart-item-count-box-count">{count}</span>
                        <button className="item-bot-add cart-item-count-box-button" onClick={(e)=>{
                            e.stopPropagation();
                            setCount((prevState: number)=>prevState+1)
                        }}>+</button>
                    </div>
                    <p className="cart-item-r-bot__price">
                        {props.price * count} ₸
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartItem;