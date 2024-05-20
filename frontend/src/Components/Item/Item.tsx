import React, { useEffect, useState } from 'react';
import './Item.scss';
import { ReactComponent as imgFav } from "../../assets/images/itemFav.svg";

export interface IItem {
    isFav: boolean;
    name: string;
    price: string;
    img: string;
    onClick: (id: number) => void;
    id: number;
    addToCartF: (id: number) => void;
}

const Item: React.FC<IItem> = (props) => {
    const [isFav, setIsFav] = useState(props.isFav);
    const [name, setName] = useState(props.name);
    const [price, setPrice] = useState(props.price);
    const [id, setId] = useState(props.id);
    const [img, setImg] = useState<string>(props.img);

    useEffect(() => {
        setIsFav(props.isFav);
        setName(props.name);
        setPrice(props.price);
        setId(props.id);

        try {
            const base64String = props.img.split(',')[1] || props.img;

            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });

            const url = URL.createObjectURL(blob);
            setImg(url);

            return () => URL.revokeObjectURL(url);
        } catch (error) {
        }
    }, [props]);

    return (
        <div className="item">
            <img src={img} alt="" className="item__img" />
            <p className="item__text">{name}</p>
            <p className="item__price">{price} ₸</p>
            <div className="item-bot">
                <button className="item-bot-fav" onClick={(e) => {
                    e.stopPropagation();
                    props.onClick(id);
                }}>
                    {React.createElement(imgFav, {
                        className: `item-bot-fav__img
                                    ${isFav ? 'item-bot-fav__img-a' : ''}`
                    })}
                </button>
                <button className="item-bot-add" onClick={(e) => {
                    e.stopPropagation();
                    props.addToCartF(id);
                }}>
                    +
                </button>
            </div>
        </div>
    );
};

export default Item;
