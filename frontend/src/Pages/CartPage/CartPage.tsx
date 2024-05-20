import React, {useEffect, useState} from 'react';


import './CartPage.scss';
import CartItem from "../../Components/CartItem/CartItem";
import item from "../../Components/Item/Item";
import {Link} from "react-router-dom";
import {ORDER_PAGE_ROUTE} from "../../Utils/Routes";
import {getCartItems, updateCartItemCount} from "../../Http/Cart";

const img = require('../../assets/images/cookie4.png');
const CartPage: React.FC = () => {

    let[items, setItems] = useState([
        {
            id: 1,
            count: 1,
            nameProduct: '',
            img: '',
            price: 0,
        },
    ])
    let[total, setTotal] = useState(0)

    function updateCount(count: number, id: number, status: string){
        if(count > 0){
            let newArr = items.map((el, index)=>{
                if(id === el.id){
                    el.count = count;
                    if(status === '+'){
                        updateCartItemCount(id, '+').then((response)=>{

                        }).catch((error)=>{

                        })
                    }
                    else if(status === '-'){
                        updateCartItemCount(id, '-').then((response)=>{

                        }).catch((error)=>{

                        })
                    }

                }

                return el;
            })
            setItems(newArr)
        }
       else{
            updateCartItemCount(id, '-').then((response)=>{

            }).catch((error)=>{

            })
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
        getCartItems().then((response)=> {
            let newArr = response.data.orderDTOs.map((el: any, index: any)=>{
                let url;
                try {
                    const base64String = el.img.split(',')[1] || el.img;

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
                    id: el.id,
                    count: el.count,
                    nameProduct: el.nameProduct,
                    img: url,
                    price: el.total / el.count,
                }
                return newObj;
            })
            setItems(newArr)
        })
        updateTotal();
    }, [])

    useEffect(()=>{
        updateTotal()
    }, [items])

    return (
        <div>
           <div className="container" style={{flexWrap: "wrap"}}>
               <p className="cart__title">Корзина</p>
               {items.length > 0 ?  <div className="cart-items-box">
                   {items.map((el, index)=>(
                       <CartItem onChange={updateCount} id={el.id} count={el.count} name={el.nameProduct} img={el.img} price={el.price} key={index}/>
                   ))}
                   <Link to={ORDER_PAGE_ROUTE} className="button-total">Оформить заказ на {total} ₸</Link>
               </div> :
               <div>

               </div>
               }

           </div>

        </div>
    );
};

export default CartPage;