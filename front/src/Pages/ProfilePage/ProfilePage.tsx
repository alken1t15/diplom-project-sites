import React, {useEffect, useState} from 'react';

import './ProfilePage.scss'
import {logOut} from "../../Http/User";

const imgSvg = require('../../assets/images/chevron.backward.svg').default;
const visaImg = require('../../assets/images/Visa.png');
const logOutImg = require('../../assets/images/logout-04.png');
const trashImg = require('../../assets/images/trash-01.png');
const cookieImg = require('../../assets/images/cookie4.png');
const ProfilePage: React.FC = () => {
    let[user, setUser] = useState({
        name: "Ayana",
        phone: "+7 777 365 8945",
        mail: "qwerty123@gmail.com",
        db: "25 апреля 2004",
    });

    let[btnAddActive, setBtnAddActive] = useState(false)
    let[addressActive, setAddressActive] = useState(false)
    let[activeAddress ,setActiveAddress] = useState([
        {
            id: 1,
            active: true,
            addr: '111',
            apart: '222',
            pod: '333',
            floor: '444',
            number: '555',
        },
        {
            id: 2,
            active: false,
            addr: '999',
            apart: '888',
            pod: '777',
            floor: '444',
            number: '555',
        },
    ])
    let[visBlockWithAddress, setVisBlockWithAddress] =useState(false)
    let[addr, serAddr] = useState('')
    let[apart, setApart] = useState('')
    let[pod, setPod] = useState('')
    let[floor, setFloor] = useState('')
    let[number, setNumber] = useState('')
    let[addNewAddress, setAddNewAddress] = useState(false)



    let[btnAddCardActive, setBtnAddCardActive] = useState(false)
    let[cardActive, setCardActive] = useState(false)
    let[activeCard ,setActiveCard] = useState([
        {
            id: 1,
            active: true,
            cardNumber: '2222 2222 2222 2222',
            expiration: '02/25',
            cvv: '444',
        },
        {
            id: 2,
            active: false,
            cardNumber: '8888 8888 8888 8888',
            expiration: '06/27',
            cvv: '888',
        },
    ])
    let[visBlockWithCard, setVisBlockWithCard] =useState(false)
    let[cardNumber, setCardNumber] = useState('')
    let[expiration, setExpiration] = useState('')
    let[cvv, setCvv] = useState('')
    let[addNewCard, setAddNewCard] = useState(false)



    let[history, setHistory] = useState([
        {
            number: '№16458',
            date: '8 марта 2024 г. в 15:43',
            address: 'Сатпаева 5',
            total: '500',
            items: [
                {
                    img: cookieImg,
                    name: 'Печенье миндаль с начинкой'
                }
            ]
        },
        {
            number: '№16458',
            date: '8 марта 2024 г. в 15:43',
            address: 'Сатпаева 5',
            total: '500',
            items: [
                {
                    img: cookieImg,
                    name: 'Печенье миндаль с начинкой'
                },
                {
                    img: cookieImg,
                    name: 'Печенье миндаль с начинкой'
                },
            ]
        },
        {
            number: '№16458',
            date: '8 марта 2024 г. в 15:43',
            address: 'Сатпаева 5',
            total: '500',
            items: [
                {
                    img: cookieImg,
                    name: 'Печенье миндаль с начинкой'
                },
                {
                    img: cookieImg,
                    name: 'Печенье миндаль с начинкой'
                },
            ]
        },
        {
            number: '№16458',
            date: '8 марта 2024 г. в 15:43',
            address: 'Сатпаева 5',
            total: '500',
            items: [
                {
                    img: cookieImg,
                    name: 'Печенье миндаль с начинкой'
                },
                {
                    img: cookieImg,
                    name: 'Печенье миндаль с начинкой'
                },
            ]
        }
    ])


    function handleInputChange(event: any) {
        const inputValue = event.target.value;
        const formattedValue = inputValue.replace(/\D/g, '');
        const formattedNumber = formattedValue
            .replace(/(\d{4})/g, '$1 ')
            .trim()
            .slice(0, 19);
        setCardNumber(formattedNumber);

    }

    function handleInputDateChange (event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        const formattedValue = inputValue.replace(/\D/g, '');
        const formattedDate = formattedValue
            .replace(/(\d{2})(\d{0,2})/, '$1/$2')
            .trim()
            .slice(0, 5);
        setExpiration(formattedDate);
    }

    function handleInputCVVChange (event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        const formattedValue = inputValue.replace(/\D/g, '');
        const maxLength = 3;
        const formattedCvv = formattedValue.slice(0, maxLength);
        setCvv(formattedCvv);
    }


    useEffect(()=>{
        if(addr != '' || apart != '' || pod != '' || floor != '' || number != ''){
            setBtnAddActive(true)
        }
        else{
            setBtnAddActive(false)
        }
    }, [addr, apart, pod, floor, number])

    useEffect(()=>{
        if(cvv.length === 3 && expiration.length === 5 && cardNumber.length === 19){
            setBtnAddCardActive(true)
        }
        else{
            setBtnAddCardActive(false)
        }
    }, [cvv, expiration, cardNumber])

    useEffect(()=>{

        activeAddress.forEach((el, index)=>{
            if(el.active){
                serAddr(el.addr)
                setApart(el.apart)
                setPod(el.pod)
                setFloor(el.floor)
                setNumber(el.number)
            }
        })

        if(addr === '' && apart === '' && pod === '' && floor === '' && number === '' && activeAddress.length === 0){
            setAddressActive(true)
        }



    }, [])

    return (
        <div className={`container`} style={{flexWrap: "wrap"}}>
            <p className="cart__title" style={{width: '100%'}}>Профиль</p>
            <div className="profile-block">
                <div className="profile-title">Привет, {user.name}</div>
               <div className="profile-person-block">
                   <div className="profile-block-l">
                       <div className="added-info-item added-info-item-profile" style={{marginTop: 0}}>
                           <p className="added-info-item__label">Имя</p>
                           <p className="added-info-item__input">{user.name}</p>
                       </div>
                       <div className="added-info-item added-info-item-profile" >
                           <p className="added-info-item__label">Номер телефона</p>
                           <p className="added-info-item__input">{user.phone}</p>
                       </div>
                       <div className="added-info-item added-info-item-profile" >
                           <p className="added-info-item__label">Почта</p>
                           <p className="added-info-item__input">{user.name}</p>
                       </div>
                       <div className="added-info-item added-info-item-profile">
                           <p className="added-info-item__label">День рождения</p>
                           <p className="added-info-item__input">{user.mail}</p>
                       </div>

                   </div>
                   <div className="profile-block-r" style={{ display: "flex" ,flexWrap: "wrap"}}>
                       <div className="info-box-r" style={{marginLeft: 0,}}>
                           <div className="person-info-block-label">Способ оплаты</div>

                           <div className="" style={{cursor: "pointer", position: 'relative'}} onClick={(e)=>{
                               setVisBlockWithCard(true)
                           }}>
                               {visBlockWithCard ?
                                   <div className={`list-box`}>
                                       {activeCard.map((el,index)=>(
                                           <div className={`person-info-block person-info-block-u`} key={index}
                                                onClick={(e)=>{
                                                    e.stopPropagation();
                                                    let newArr = activeCard.map((el1, index)=>{
                                                        el1.active = el1.id === el.id
                                                        return el1;
                                                    })
                                                    setActiveCard(newArr)
                                                    setVisBlockWithCard(false)

                                                }}
                                           >
                                               <div className={`card-block-l`}>
                                                   <img src={visaImg} alt=""/>
                                               </div>
                                               <div className="card-block-r">
                                                   <div className="card-block-r__name">Card</div>
                                                   <div className="card-block-r__number">{el.cardNumber.slice(0, 15).replace(/\d{4}(?=.)/g, '**** ')} {el.cardNumber.slice(15, 19)}</div>
                                               </div>

                                           </div>
                                       ))}
                                   </div>
                                   : ''}

                               {activeCard.map((el, index)=>(
                                   <div className={`person-info-block ${el.active ? '' : 'person-info-block-h'}`} key={index}>
                                       <div className={`card-block-l ${el.active ? '' : 'none'}`}>
                                           <img src={visaImg} alt=""/>
                                       </div>
                                       <div className="card-block-r">
                                           <div className="card-block-r__name">Card</div>
                                           <div className="card-block-r__number">{el.cardNumber.slice(0, 15).replace(/\d{4}(?=.)/g, '**** ')} {el.cardNumber.slice(15, 19)}</div>
                                       </div>
                                   </div>
                               ))}

                           </div>



                           <button className={`add-new-item ${!addNewCard ? '' : 'add-new-item-h'}`} onClick={(e)=>{
                               setAddNewCard(true)
                           }}>
                               Добавить
                           </button>
                           {
                               addNewCard ?    <div>
                                   {activeCard.map((el, index)=>(
                                       <div className={`added-info-box added-info-box-card ${el.active ? '' : 'added-info-box-hidden'}`}
                                            key={index}>
                                           <div className="card-box">
                                               <div className="added-info-item added-info-item-card" style={{marginTop: 0}}>
                                                   <p className="added-info-item-card__text">Номер карты</p>
                                                   <input value={cardNumber !== '' ? cardNumber : ''} onChange={(e)=>{
                                                       handleInputChange(e);
                                                   }} type="text" placeholder={'0000 0000 0000 0000'} className="added-info-item__input  added-info-item__input-card"/>
                                               </div>
                                               <div className="card-bottom">
                                                   <div className="added-info-item added-info-item-card">
                                                       <p className="added-info-item-card__text">Срок действия</p>
                                                       <input value={expiration !== '' ? expiration : ''} onChange={(e)=>{
                                                           handleInputDateChange(e)
                                                       }} type="text" maxLength={5} placeholder={'MM/YY'} className="added-info-item__input added-info-item__input-card added-info-item__input-card-m"/>
                                                   </div>
                                                   <div className="added-info-item added-info-item-card">
                                                       <p className="added-info-item-card__text">Код безопасности</p>
                                                       <input value={cvv !== '' ? cvv : ''} onChange={(e)=>{
                                                           handleInputCVVChange(e)
                                                       }} type="text" maxLength={3} placeholder={'000'} className="added-info-item__input  added-info-item__input-card added-info-item__input-card-m"/>
                                                   </div>
                                               </div>
                                           </div>
                                           <button className={`added-info__button ${btnAddCardActive ? 'added-info__button-a' : ''}`} onClick={(e)=>{
                                               setBtnAddCardActive(false);
                                               setCardActive(false);
                                               setAddNewCard(false);
                                           }}>
                                               Добавить
                                           </button>
                                       </div>
                                   ))}
                               </div> : ''
                           }



                       </div>
                       <br/>
                       <div className="info-box-r" style={{marginLeft: 0, marginTop: 25}}>
                           <div className="person-info-block-label">Адрес</div>
                           {addressActive ?
                               <div>
                                   {activeAddress.map((el, index)=>(
                                       <div className={`added-info-box ${el.active ? '' : 'added-info-box-hidden'}`} key={index}>
                                           <div className="added-info-item" style={{marginTop: 0}}>
                                               <p className="added-info-item__label">Улица и дом</p>
                                               <input value={addr !== '' ? addr : el.addr} onChange={(e)=>{
                                                   serAddr( e.target.value);
                                               }} type="text" className="added-info-item__input"/>
                                           </div>
                                           <div className="added-info-item">
                                               <p className="added-info-item__label">Подъезд</p>
                                               <input value={pod !== '' ? pod : el.pod} onChange={(e)=>{
                                                   setPod(e.target.value);
                                               }} type="text" className="added-info-item__input"/>
                                           </div>
                                           <div className="added-info-item">
                                               <p className="added-info-item__label">Код на двери</p>
                                               <input value={apart !== '' ? apart : el.apart} onChange={(e)=>{
                                                   setApart(e.target.value);
                                               }} type="text" className="added-info-item__input"/>
                                           </div>
                                           <div className="added-info-item">
                                               <p className="added-info-item__label">Этаж</p>
                                               <input value={floor !== '' ? floor : el.floor} onChange={(e)=>{
                                                   setFloor(e.target.value);
                                               }} type="text" className="added-info-item__input"/>
                                           </div>
                                           <div className="added-info-item">
                                               <p className="added-info-item__label">Квартира</p>
                                               <input value={number !== '' ? number : el.number} onChange={(e)=>{
                                                   setNumber(e.target.value);
                                               }} type="text" className="added-info-item__input"/>
                                           </div>
                                           <button className={`added-info__button ${btnAddActive ? 'added-info__button-a' : ''}`} onClick={(e)=>{
                                               setBtnAddActive(false);
                                               setAddressActive(false);
                                           }}>
                                               Сохранить
                                           </button>
                                       </div>
                                   ))}
                               </div>
                               :
                               <div className="" style={{cursor: "pointer", position: 'relative'}} onClick={(e)=>{
                                   setVisBlockWithAddress(true)
                               }}>
                                   {visBlockWithAddress ?
                                       <div className={`list-box`}>
                                           {activeAddress.map((el,index)=>(
                                               <div className={`person-info-block person-info-block-u`} key={index}
                                                    onClick={(e)=>{
                                                        e.stopPropagation();
                                                        let newArr = activeAddress.map((el1, index)=>{
                                                            el1.active = el1.id === el.id
                                                            return el1;
                                                        })
                                                        setActiveAddress(newArr)
                                                        setVisBlockWithAddress(false)

                                                    }}
                                               >
                                                   <div className={`person-info-block-l`}>
                                                       <p className="person-info-block-l__title">{el.addr}</p>
                                                       <p className="person-info-block-l__text">
                                                           {el.apart  + ', ' +  el.pod + ', ' + el.floor + ', Домофон: ' + el.number}
                                                       </p>
                                                   </div>

                                               </div>
                                           ))}
                                       </div>
                                       : ''}

                                   {activeAddress.map((el, index)=>(
                                       <div className={`person-info-block ${el.active ? '' : 'person-info-block-h'}`} key={index}>
                                           <div className={`person-info-block-l ${el.active ? '' : 'none'}`}>

                                               <p className="person-info-block-l__title">{el.addr}</p>
                                               <p className="person-info-block-l__text">
                                                   {el.apart  + ', ' +  el.pod + ', ' + el.floor + ', Домофон: ' + el.number}
                                               </p>
                                           </div>
                                           <div className="person-info-block-r">
                                               {!visBlockWithAddress ? <button className={`person-info-block-r-btn`} onClick={(e)=>{
                                                   e.stopPropagation();
                                                   setAddressActive(true)
                                               }}>
                                                   <img src={imgSvg}/>
                                               </button> : ''}
                                           </div>
                                       </div>
                                   ))}

                               </div>}
                           <button className={`add-new-item ${!addNewAddress ? '' : 'add-new-item-h'}`} onClick={(e)=>{
                               setAddNewAddress(true)
                           }}>
                               Добавить
                           </button>
                           {
                               addNewAddress ?    <div>
                                   {activeAddress.map((el, index)=>(
                                       <div className={`added-info-box ${el.active ? '' : 'added-info-box-hidden'}`} key={index}>
                                           <div className="added-info-item" style={{marginTop: 0}}>
                                               <p className="added-info-item__label">Улица и дом</p>
                                               <input value={addr !== '' ? addr : el.addr} onChange={(e)=>{
                                                   serAddr( e.target.value);
                                               }} type="text" className="added-info-item__input"/>
                                           </div>
                                           <div className="added-info-item">
                                               <p className="added-info-item__label">Подъезд</p>
                                               <input value={pod !== '' ? pod : el.pod} onChange={(e)=>{
                                                   setPod(e.target.value);
                                               }} type="text" className="added-info-item__input"/>
                                           </div>
                                           <div className="added-info-item">
                                               <p className="added-info-item__label">Код на двери</p>
                                               <input value={apart !== '' ? apart : el.apart} onChange={(e)=>{
                                                   setApart(e.target.value);
                                               }} type="text" className="added-info-item__input"/>
                                           </div>
                                           <div className="added-info-item">
                                               <p className="added-info-item__label">Этаж</p>
                                               <input value={floor !== '' ? floor : el.floor} onChange={(e)=>{
                                                   setFloor(e.target.value);
                                               }} type="text" className="added-info-item__input"/>
                                           </div>
                                           <div className="added-info-item">
                                               <p className="added-info-item__label">Квартира</p>
                                               <input value={number !== '' ? number : el.number} onChange={(e)=>{
                                                   setNumber(e.target.value);
                                               }} type="text" className="added-info-item__input"/>
                                           </div>
                                           <button className={`added-info__button ${btnAddActive ? 'added-info__button-a' : ''}`} onClick={(e)=>{
                                               setBtnAddActive(false);
                                               setAddressActive(false);
                                               setAddNewAddress(false)
                                           }}>
                                               Добавить
                                           </button>
                                       </div>
                                   ))}
                               </div> : ''
                           }


                       </div>
                   </div>
               </div>


            </div>
            <div className="profile-bottom">
                <button className="profile-btn" onClick={(e)=>{
                    logOut()
                }}>
                    <img src={logOutImg} alt=""/><span>Выйти</span>
                </button>

                <button className="profile-btn" style={{marginTop: 10}} onClick={(e)=>{

                }}>
                    <img src={trashImg} alt=""/><span>Удалить аккаунт</span>
                </button>
            </div>
            <div className="profile-history">
                <p className="cart__title" style={{width: '100%'}}>История заказов</p>
                <div className="history-block">
                    {history.map((el, index)=>(
                        <div className="history-item" key={index}>
                            <div className="history-item-top">
                                <p className="history-item__id">{el.number}</p>
                                <p className="history-item__date">{el.date}</p>
                                <p className="history-item__address" style={{marginBottom: 20}}>{el.address}</p>
                                {el.items.map((el1, index1)=>(
                                    <div className={`history-item__item`} key={index1}>
                                        <div className="history-item__item-l">
                                            <img src={el1.img} alt=""/>
                                        </div>
                                        <div className="history-item__item-r">
                                            {el1.name}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="history-item-bottom">
                                <span className={`history-item-bottom__text`}>Всего</span>
                                <span className={`history-item-bottom__text`}>{el.total} ₸</span>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
};

export default ProfilePage;