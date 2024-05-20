import React, {useEffect, useState} from 'react';


import './CartPage.scss';
import CartItem from "../../Components/CartItem/CartItem";
import item from "../../Components/Item/Item";
import {Link} from "react-router-dom";
import {ORDER_PAGE_ROUTE} from "../../Utils/Routes";

const img = require('../../assets/images/cookie4.png');
const CartPage: React.FC = () => {



    let[items, setItems] = useState([
        {
            id: 1,
            count: 1,
            name: 'Печенье Миндаль с начинкой',
            img: img,
            price: 900,
        },
        {
            id: 2,
            count: 1,
            name: 'Круассан Шоколад и пекан',
            img: img,
            price: 1100,
        },
    ])
    let[total, setTotal] = useState(0)

    function updateCount(count: number, id: number){
        if(count > 0){
            let newArr = items.map((el, index)=>{
                if(id === el.id){
                    el.count = count;
                }

                return el;
            })
            setItems(newArr)
        }
       else{
            let newArr = items.filter((el, index)=>el.id !== id)
            setItems(newArr)

        }
    }

    function updateTotal(){
        let allTotal = 0;
        items.map((el, index)=>{
            allTotal += el.count * el.price

        })
        setTotal(allTotal)
    }

    useEffect(()=>{
        updateTotal()
    }, [])

    useEffect(()=>{
        updateTotal()
    }, [items])

    return (
        <div>
           <div className="container" style={{flexWrap: "wrap"}}>
               <p className="cart__title">Корзина</p>
              <div className="cart-items-box">
                  {items.map((el, index)=>(
                      <CartItem onChange={updateCount} id={el.id} count={el.count} name={el.name} img={el.img} price={el.price} key={index}/>
                  ))}
                  <Link to={ORDER_PAGE_ROUTE} className="button-total">Оформить заказ на {total} ₸</Link>
              </div>

           </div>

        </div>
    );
};

export default CartPage;