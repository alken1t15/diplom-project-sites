import React, {useEffect, useState} from 'react';

import './MainPage.scss';
import Item from "../../Components/Item/Item";
import {ReactComponent as imgFav} from "../../assets/images/itemFav.svg";
import Button from "../../Components/UI/Button/Button";
import {getShopItem, getShopItems} from "../../Http/Shop";
import {addToFavorite, removeFromFavorite} from "../../Http/Favorite";
import {addToCart} from "../../Http/Cart";
const search = require('../../assets/images/magnifyingglass.svg').default;
const img1 = require('../../assets/images/image 8.png');
const img8 = require('../../assets/images/image 9.png');
const star = require('../../assets/images/star.svg').default;
const MainPage: React.FC = () => {
    let[searchActive, setSearchActive] = useState(false);
    let[searchText, setSearchText] = useState('');
    let[category, setCategory] = useState([
        {
          id: 1,
          name: 'Печенье',
          active: true,
        },
        {
            id: 2,
            name: 'Пироги',
            active: false,
        },
        {
            id: 3,
            name: 'Пирожное',
            active: false,
        },
    ]);
    let[items, setItems] = useState([
        {
            id: 1,
            isFavorite: true,
            name: 'Шоколадный чизкейк',
            price: '500',
            img: img1
        },
    ]);
    let[curItem, setCurItem] = useState<any>( null);
    let[active, setActive] = useState( false);
    let[count, setCount] = useState<number>(1);
    let[isFavor, setIsFavor] = useState(false);

    function setActiveCategory(index: number){
        let newArr = [...category].map((el, ind)=>{
            el.active = index === ind && !el.active;
            return el;
        })
        setCategory(newArr)
    }

    useEffect(()=>{
        let categoryId = -1;
        category.forEach((el, index)=>{
            if(el.active){
                categoryId = el.id
            }
        })
        getShopItems(String(categoryId !== -1 ? categoryId : ''), searchText).then(response=>{
            setItems(response.data.products)
        })
            .catch((error)=>{
                console.log('')
            })
    },[searchText, category])

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
                console.log('f')
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
        getShopItems('', '').then(response=>{
            let categoryArr = response.data.categories.map((el: any, index: any)=>{
                el.active = false
                return el
            })

            setCategory(categoryArr);

            setItems(response.data.products)
        })
            .catch((error)=>{
            })
    }, [])


    return (
        <div className={`container`} style={{marginTop: 50, display: "block"}}>
           <div className="main-page-top">
               <div className={` search-block ${searchActive ? 'search-block-a' : ''}`}
                    onClick={()=>{setSearchActive(true)}}>
                   <img src={search} className={`search-block__img`} alt="search img"/>
                   <input type={"text"} onChange={(e)=>{
                       setSearchText(e.target.value)
                   }} className={`${searchActive ? 'search-block__input-active' : 'search-block__input'}`}/>
               </div>
               <div style={{marginLeft: 15}} className="category-block">
                   {category.map((el, index)=>(
                       <button key={index} className={`category-block-item ${el.active ? 'category-block-item-a' : ''}`} onClick={(e)=>{
                           setActiveCategory(index)
                       }} >
                           <p className={`category-block-item__text ${el.active ? 'category-block-item__text-a' : ''}`}>{el.name}</p>
                       </button>
                   ))}
               </div >
           </div>
            <div className="main-page-body">
                {items.map((el, index)=>(
                    <div style={{cursor: "pointer", marginTop: 25}} onClick={(e)=>{
                        checkMore(el.id)
                    }} key={index}>
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
            </div>
        </div>
    );
};

export default MainPage;