import React, {useEffect, useState} from 'react';

import './FavPage.scss';
import Item, {IItem} from "../../Components/Item/Item";
import {ReactComponent as imgFav} from "../../assets/images/itemFav.svg";
import Button from "../../Components/UI/Button/Button";
import {getShopItems} from "../../Http/Shop";
const search = require('../../assets/images/magnifyingglass.svg').default;
const img1 = require('../../assets/images/image 8.png');
const img8 = require('../../assets/images/image 9.png');
const star = require('../../assets/images/star.svg').default;
const FavPage: React.FC = () => {
    // let[searchActive, setSearchActive] = useState(false);
    // let[searchText, setSearchText] = useState('');
    // let[category, setCategory] = useState([
    //     {
    //         id: 1,
    //         name: 'Печенье',
    //         active: true,
    //     },
    //     {
    //         id: 2,
    //         name: 'Пироги',
    //         active: false,
    //     },
    //     {
    //         id: 3,
    //         name: 'Пирожное',
    //         active: false,
    //     },
    // ]);
    // let[items, setItems] = useState([
    //     {
    //         id: 1,
    //         isFavorite: true,
    //         name: 'Шоколадный чизкейк',
    //         price: '500',
    //         img: img1
    //     },
    //     {
    //         id: 1,
    //         isFavorite: false,
    //         name: 'Шоколад и орехи',
    //         price: '500',
    //         img: img1
    //     },
    //     {
    //         id: 1,
    //         isFavorite: false,
    //         name: 'Корица и крем-чиз',
    //         price: '500',
    //         img: img1
    //     },
    //     {
    //         id: 1,
    //         isFavorite: false,
    //         name: 'Красный бархат',
    //         price: '500',
    //         img: img1
    //     },
    // ]);
    // let[curItem, setCurItem] = useState<any>( null);
    // let[active, setActive] = useState( false);
    // let[count, setCount] = useState<number>(1);
    //
    // function setActiveCategory(index: number){
    //     let newArr = [...category].map((el, ind)=>{
    //         el.active = index === ind && !el.active;
    //         return el;
    //     })
    //     setCategory(newArr)
    // }
    //
    // useEffect(()=>{
    //     let categoryId = -1;
    //     category.forEach((el, index)=>{
    //         if(el.active){
    //             categoryId = el.id
    //         }
    //     })
    //     getShopItems(String(categoryId !== -1 ? categoryId : ''), searchText).then(response=>{
    //         let categoryArr = response.data.categories.map((el: any, index: any)=>{
    //             el.active = false
    //             return el
    //         })
    //         setItems(response.data.products)
    //     })
    // },[searchText, category])
    //
    // function setFavourite(id: number){
    //     let newArr = [...items].map((el, ind)=>{
    //         if(el.id === id){
    //             el.isFavorite = !el.isFavorite;
    //         }
    //         return el;
    //     })
    //
    //     setItems(newArr)
    // }
    //
    // function addToCart(id: number){
    //     setActive(false)
    // }
    //
    // function checkMore(index: number){
    //     setCurItem({
    //         id: 1,
    //         name: 'Миндаль с начинкой',
    //         tags: ['Хит', 'Новинка'],
    //         rating: 4.9,
    //         gram: 170,
    //         price: 900,
    //         text: 'Печенье с миндальными слайсами и начинкой из ванильного крема',
    //         description: 'Состав: мука, сахар, соль, вода, яйцо куриное, дрожжи, масло сливочное, шоколад молочный, сливки 33%',
    //         img: img8,
    //         isFavorite: true,
    //         count: 1,
    //
    //     })
    //     setActive(true)
    // }
    //
    // // function
    //
    // useEffect(()=>{
    //     getShopItems('', '').then(response=>{
    //         let categoryArr = response.data.categories.map((el: any, index: any)=>{
    //             el.active = false
    //             return el
    //         })
    //         setCategory(categoryArr);
    //
    //         setItems(response.data.products)
    //     })
    // }, [])


    return (
        <div className={`container`} style={{marginTop: 50, display: "block"}}>
            {/*<div className="main-page-top">*/}
            {/*    <div className={` search-block ${searchActive ? 'search-block-a' : ''}`}*/}
            {/*         onClick={()=>{setSearchActive(true)}}>*/}
            {/*        <img src={search} className={`search-block__img`} alt="search img"/>*/}
            {/*        <input type={"text"} onChange={(e)=>{*/}
            {/*            setSearchText(e.target.value)*/}
            {/*        }} className={`${searchActive ? 'search-block__input-active' : 'search-block__input'}`}/>*/}
            {/*    </div>*/}
            {/*    <div style={{marginLeft: 15}} className="category-block">*/}
            {/*        {category.map((el, index)=>(*/}
            {/*            <button key={index} className={`category-block-item ${el.active ? 'category-block-item-a' : ''}`} onClick={(e)=>{*/}
            {/*                setActiveCategory(index)*/}
            {/*            }} >*/}
            {/*                <p className={`category-block-item__text ${el.active ? 'category-block-item__text-a' : ''}`}>{el.name}</p>*/}
            {/*            </button>*/}
            {/*        ))}*/}
            {/*    </div >*/}
            {/*</div>*/}
            {/*<div className="main-page-body">*/}
            {/*    {items.map((el, index)=>(*/}
            {/*        <div style={{cursor: "pointer", marginTop: 25}} onClick={(e)=>{*/}
            {/*            checkMore(index)*/}
            {/*        }} key={index}>*/}
            {/*            <Item addToCartF={addToCart}*/}
            {/*                  onClick={setFavourite}*/}
            {/*                  isFav={el.isFavorite}*/}
            {/*                  name={el.name}*/}
            {/*                  price={el.price}*/}
            {/*                  img={el.img}*/}
            {/*                  id={el.id}/>*/}
            {/*        </div>*/}
            {/*    ))}*/}

            {/*    {curItem !== null && active ?*/}
            {/*        <div className={`modal`} onClick={(e)=>{*/}
            {/*            setActive(false)*/}
            {/*        }}>*/}
            {/*            <div className="modal-container" onClick={(e)=>{*/}
            {/*                e.stopPropagation();*/}
            {/*            }}>*/}
            {/*                <img src={curItem.img} alt="" className="modal__img"/>*/}
            {/*                <div className="modal-top">*/}
            {/*                    <div className="modal-top-left">*/}
            {/*                        {curItem.tags.map((el: any,index: any)=>(*/}
            {/*                            <div className={'modal-top-left__tags'} key={index}>*/}
            {/*                                {el}*/}
            {/*                            </div>*/}
            {/*                        ))}*/}
            {/*                    </div>*/}
            {/*                    <div className="modal-top-right">*/}
            {/*                        <button className="item-bot-fav" onClick={(e)=>{*/}
            {/*                            e.stopPropagation();*/}
            {/*                            setFavourite(curItem.id)*/}
            {/*                        }}>*/}
            {/*                            {React.createElement(imgFav, {*/}
            {/*                                className: `item-bot-fav__img*/}
            {/*                        ${curItem.isFavorite ? 'item-bot-fav__img-a' : ''}`*/}
            {/*                            })}*/}
            {/*                        </button>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="modal-hero-top">*/}
            {/*                    <div className="modal-hero-top-left">*/}
            {/*                        <p className="modal-hero-top-left__text">{curItem.name}</p>*/}
            {/*                        <p className="modal-hero-top-left__subtext">{curItem.gram} г</p>*/}
            {/*                    </div>*/}
            {/*                    <div className="modal-hero-top-right">*/}
            {/*                        <img src={star} alt="Star img" className={`modal-hero-top-right__img`}/>*/}
            {/*                        <p className="modal-hero-top-right__text">{curItem.rating}</p>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="modal-hero-middle">*/}
            {/*                    <p className="modal-hero-middle__price">{curItem.price} ₸</p>*/}
            {/*                    <p className="modal-hero-middle__text">{curItem.text}</p>*/}
            {/*                    <p className="modal-hero-middle__descr">{curItem.description}</p>*/}
            {/*                </div>*/}
            {/*                <div className="modal-bot">*/}
            {/*                    <div className="count-block">*/}
            {/*                        <button className={`item-bot-add-in ${count > 1 ? 'count-block__min-a' : ''}`}*/}

            {/*                                onClick={(e)=>{*/}
            {/*                                    e.stopPropagation()*/}
            {/*                                    if(count > 1){*/}
            {/*                                        setCount((prevState: number)=>prevState-1)*/}
            {/*                                    }}}*/}
            {/*                        >-</button>*/}
            {/*                        <span className="count-block__text">{count}</span>*/}
            {/*                        <button className="item-bot-add" onClick={(e)=>{*/}
            {/*                            e.stopPropagation();*/}
            {/*                            setCount((prevState: number)=>prevState+1)*/}
            {/*                        }}>+</button>*/}
            {/*                    </div>*/}



            {/*                    <button className={'add-to-cart-btn'} onClick={(e)=>{*/}
            {/*                        e.stopPropagation();*/}
            {/*                        addToCart(curItem.id)*/}
            {/*                    }}>Добавить в корзину</button>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        : ''}*/}
            {/*</div>*/}
        </div>
    );
};

export default FavPage;