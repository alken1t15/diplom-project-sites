import React, {useEffect, useState} from 'react';

import './FavPage.scss';
import Item, {IItem} from "../../Components/Item/Item";
import {ReactComponent as imgFav} from "../../assets/images/itemFav.svg";
import Button from "../../Components/UI/Button/Button";
import {getShopItem} from "../../Http/Shop";
import {addToFavorite, getAllFavorite, removeFromFavorite} from "../../Http/Favorite";
import {addToCart} from "../../Http/Cart";
const search = require('../../assets/images/magnifyingglass.svg').default;
const img1 = require('../../assets/images/image 8.png');
const img8 = require('../../assets/images/image 9.png');
const star = require('../../assets/images/star.svg').default;

interface IItems{
    id: number;
    isFavorite: boolean;
    name: string;
    price: string;
    img: any
}
const FavPage: React.FC = () => {
    let[items, setItems] = useState<IItems[]>([

    ]);
    let[curItem, setCurItem] = useState<any>( null);
    let[active, setActive] = useState( false);
    let[count, setCount] = useState<number>(1);
    let[isFavor, setIsFavor] = useState(false);

    function setFavourite(id: number){
        let favId = -1;
        let deleteFav = false;
        let newArr = [...items].map((el, ind)=>{
            if(el.id === id && !el.isFavorite){
                favId = el.id;
                el.isFavorite = true;
                return el;
            }
            else if(el.id === id && el.isFavorite){
                favId = el.id;
                el.isFavorite = false;
                deleteFav= true;
                return el;
            }
            return el;

        })

        if(!deleteFav){
            addToFavorite(favId).then((response)=>{
                getAllFavorite().then(response=>{
                    setItems(response.data)
                })
                    .catch((error)=>{
                    })
            })
                .catch((err)=>{

                })
        }
        else{
            removeFromFavorite(favId).then((response)=>{

            })
                .catch((err)=>{

                })
        }

        setItems(newArr)
    }

    function addCart(id: number, count? : number){
        setActive(false)
        if(count){
            addToCart(id, count).then((response)=>{
            })
                .catch((error)=>{

                })
        }
        else{
            addToCart(id, 1).then((response)=>{
            })
                .catch((error)=>{

                })
        }
    }

    function checkMore(id: number){
        getShopItem(id).then((response)=>{
            let url;
            try {
                const base64String = response.data.img.split(',')[1] || response.data.img;

                const byteCharacters = atob(base64String);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: 'image/png' });

                url = URL.createObjectURL(blob);

            } catch (error) {
            }

            let newObj = {
                id: response.data.id,
                name: response.data.name,
                tags: response.data.tags,
                rating: response.data.rating,
                weight: response.data.weight,
                price: response.data.price,
                text: response.data.description,
                description: response.data.composition,
                img: url,
                isFavorite: response.data.isFavorite,
                count: response.data.countOrder


            }
            setIsFavor(response.data.isFavorite)
            setCurItem(newObj)
        })
            .catch((error)=>{
            })
        setActive(true)
    }


    function setFavCurItem(id: number, isFav: boolean){

        let newArr = items.map((el, index)=>{
            if(id === el.id){
                el.isFavorite = !el.isFavorite;
            }

            return el;
        })

        setItems(newArr)

        if(!isFav){
            let newObj = curItem
            newObj.isFavorite =  true;
            setCurItem(newObj)
            setIsFavor(true)
            addToFavorite(id).then((response)=>{

            })
                .catch((err)=>{

                })
        }
        else{
            let newObj = curItem
            newObj.isFavorite =  false;
            setCurItem(newObj)
            setIsFavor(false)
            removeFromFavorite(id).then((response)=>{

            })
                .catch((err)=>{

                })
        }

    }

    useEffect(()=>{
        getAllFavorite().then(response=>{
            setItems(response.data)
        })
            .catch((error)=>{
            })
    }, [])


    return (
        <div className={`container`} style={{marginTop: 50, display: "block"}}>
            {items && items.length > 0 ? <>
                <div className="main-page-body">
                    {items.map((el, index)=>(
                        <div style={{cursor: "pointer", marginTop: 25}} onClick={(e)=>{
                            checkMore(el.id)
                        }} key={index} className={`${el.isFavorite ? '' : 'none'}`}>
                            <Item addToCartF={addCart}
                                  onClick={setFavourite}
                                  isFav={el.isFavorite}
                                  name={el.name}
                                  price={el.price}
                                  img={el.img}
                                  id={el.id}/>
                        </div>
                    ))}

                    {curItem !== null && active ?
                        <div className={`modal`} onClick={(e)=>{
                            setActive(false)
                        }}>
                            <div className="modal-container" onClick={(e)=>{
                                e.stopPropagation();
                            }}>
                                <img src={curItem.img} alt="" className="modal__img"/>
                                <div className="modal-top">
                                    <div className="modal-top-left">
                                        {curItem.tags && curItem.tags.length > 0 ?   curItem.tags.map((el: any,index: any)=>(
                                            <div className={'modal-top-left__tags'} key={index}>
                                                {el}
                                            </div>
                                        )) : ''}
                                    </div>
                                    <div className="modal-top-right">
                                        <button className="item-bot-fav" onClick={(e)=>{
                                            e.stopPropagation();
                                            setFavCurItem(curItem.id, curItem.isFavorite)
                                        }}>
                                            {React.createElement(imgFav, {
                                                className: `item-bot-fav__img
                                    ${isFavor ? 'item-bot-fav__img-a' : ''}`
                                            })}
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-hero-top">
                                    <div className="modal-hero-top-left">
                                        <p className="modal-hero-top-left__text">{curItem.name}</p>
                                        <p className="modal-hero-top-left__subtext">{curItem.weight} г</p>
                                    </div>
                                    <div className="modal-hero-top-right">
                                        <img src={star} alt="Star img" className={`modal-hero-top-right__img`}/>
                                        <p className="modal-hero-top-right__text">{curItem.rating}</p>
                                    </div>
                                </div>
                                <div className="modal-hero-middle">
                                    <p className="modal-hero-middle__price">{curItem.price} ₸</p>
                                    <p className="modal-hero-middle__text">{curItem.text}</p>
                                    <p className="modal-hero-middle__descr">{curItem.description}</p>
                                </div>
                                <div className="modal-bot">
                                    <div className="count-block">
                                        <button className={`item-bot-add-in ${count > 1 ? 'count-block__min-a' : ''}`}

                                                onClick={(e)=>{
                                                    e.stopPropagation()
                                                    if(count > 1){
                                                        setCount((prevState: number)=>prevState-1)
                                                    }}}
                                        >-</button>
                                        <span className="count-block__text">{count}</span>
                                        <button className="item-bot-add" onClick={(e)=>{
                                            e.stopPropagation();
                                            setCount((prevState: number)=>prevState+1)
                                        }}>+</button>
                                    </div>



                                    <button className={'add-to-cart-btn'} onClick={(e)=>{
                                        e.stopPropagation();
                                        addCart(curItem.id, count)
                                    }}>Добавить в корзину</button>
                                </div>
                            </div>
                        </div>
                        : ''}
                </div></> : ''}
        </div>
    );
};

export default FavPage;