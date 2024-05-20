import React, {useEffect, useState} from 'react';


import './OrderPage.scss';
import Input from "../../Components/UI/Input/Input";
import {Link, useNavigate} from "react-router-dom";
import {FINISHED_PAGE_ROUTE} from "../../Utils/Routes";
import Switch from "../../Components/UI/Switch/Switch";
import {addCards, getCards} from "../../Http/Card";
import {addNewUserAddress, getAddresses} from '../../Http/Address';
import {getCartItems} from "../../Http/Cart";
import {addOrder} from "../../Http/Order";
const imgSvg = require('../../assets/images/chevron.backward.svg').default;
const visaImg = require('../../assets/images/Visa.png');

enum TimeSlot {
    First = '15:00 - 18:00',
    Second = '18:00 - 21:00',
}
const OrderPage: React.FC = () => {
    let[options, setOptions] = useState([TimeSlot.First, TimeSlot.Second])
    let [selectedOption, setSelectedOption] = useState<TimeSlot | null>(TimeSlot.First);
    let [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    let [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString());
    let[comment, setComment] = useState('');

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
    ])
    let[visBlockWithCard, setVisBlockWithCard] =useState(false)
    let[cardNumber, setCardNumber] = useState('')
    let[expiration, setExpiration] = useState('')
    let[cvv, setCvv] = useState('')
    let[addNewCard, setAddNewCard] = useState(false)

    let[bonus, setBonus] = useState(false)
    let[total, setTotal] = useState(2000)

    let navigator = useNavigate()

    function updateBonus(value: boolean){
        setBonus(value)
    }

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

    function updateComment(value: string){
        setComment(value)
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

        getCards().then((response)=>{
            let newArr = response.data.map((el: any, index: any)=>{
                let newObj = {
                    id: el.id,
                    active: index === 0,
                    cardNumber: el.number,
                    expiration: el.date,
                    cvv: el.cvv,
                }
                return newObj;
            })

            setActiveCard(newArr)
        })
            .catch((error)=>{

            })

        getCartItems().then((response)=>{
            setTotal(response.data.total)
        }).catch((error)=>{

        })

        getAddresses().then((response)=>{
            let newArr = response.data.map((el: any, index: any)=>{
                let newObj = {
                    id: el.id,
                    active: index === 0,
                    addr: el.street,
                    apart: el.flat,
                    pod: el.entrance,
                    floor: el.floor,
                    number: el.number,
                }
                return newObj;
            })
            setActiveAddress(newArr)
        }).catch((error)=>{})

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

        let intervalId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 60000);


        return () => clearInterval(intervalId);


    }, [])

    let isTimeSlotAvailable = (timeSlot: TimeSlot): boolean => {
        let currentHour = new Date().getHours();
        if (timeSlot === TimeSlot.First && currentHour >= 15 && currentHour < 18) {
            return false;
        }
        if (timeSlot === TimeSlot.Second && currentHour >= 18 && currentHour < 21) {
            return false;
        }
        return true;
    };

    let handleOptionClick = (option: TimeSlot) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
    };
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
    }, [activeAddress])


    return (
        <div style={{paddingBottom: 50}}>
            <div className="container" style={{flexWrap: "wrap"}}>
                <p className="cart__title">Доставка</p>
                   <div className="info-box">
                       <div className="info-box-l">
                           <Input placeholder={'Комментарий для ресторана (особые запросы, аллергии, ограничения по диете?)'}
                                  onChangeF={updateComment} type={'text'} styles={{width: 390}}/>
                           <div className="custom-select">
                               <div className="selected-option added-info-item__input" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                   <span>Выберите время</span>
                                   <i className={`arrow ${isDropdownOpen ? 'up' : 'down'}`}></i>
                                   <div className="added-info-item__input added-info-item__input-time">{selectedOption}</div>
                               </div>
                               {isDropdownOpen && (
                                   <div className="options">
                                       {options.map((option) => (
                                           <div
                                               style={{cursor: "pointer"}}
                                               key={option}
                                               className={`option ${!isTimeSlotAvailable(option) ? 'disabled' : ''}`}
                                               onClick={() => handleOptionClick(option)}
                                           >
                                               {option}
                                           </div>
                                       ))}
                                   </div>
                               )}
                           </div>

                           <div className="info-box-r">
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
                                           <div className={`list-box ${activeAddress.length > 1 ? 'list-box-u' : ''}`}
                                           >
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
                                               {/*<div className="person-info-block-r">*/}
                                               {/*    {!visBlockWithAddress ? <button className={`person-info-block-r-btn`} onClick={(e)=>{*/}
                                               {/*        e.stopPropagation();*/}
                                               {/*        setAddressActive(true)*/}
                                               {/*    }}>*/}
                                               {/*        <img src={imgSvg}/>*/}
                                               {/*    </button> : ''}*/}
                                               {/*</div>*/}
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
                                                   addNewUserAddress(addr, apart, pod, floor, number).then((response)=>{
                                                       getAddresses().then((response)=>{
                                                           let newArr = response.data.map((el: any, index: any)=>{
                                                               let newObj = {
                                                                   id: el.id,
                                                                   active: index === 0,
                                                                   addr: el.street,
                                                                   apart: el.flat,
                                                                   pod: el.entrance,
                                                                   floor: el.floor,
                                                                   number: el.number,
                                                               }
                                                               return newObj;
                                                           })
                                                           setActiveAddress(newArr)
                                                       }).catch((error)=>{})
                                                   })
                                                       .catch((error)=>{

                                                       })
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




               <div className="card-container">
                   <p className="cart__title">Оплата</p>
                   <div className="info-box-r" style={{marginLeft: 0}}>
                       <div className="person-info-block-label">Выберите способ оплаты</div>

                       <div className="" style={{cursor: "pointer", position: 'relative'}} onClick={(e)=>{
                           setVisBlockWithCard(true)
                       }}>
                           {visBlockWithCard ?
                               <div className={`list-box ${activeCard.length > 1 ? 'list-box-u' : ''}`} style={{bottom: -(activeCard.length * 75)}}>
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
                                           addCards(cardNumber, expiration, cvv).then((response)=>{
                                               getCards().then((response)=>{
                                                   let newArr = response.data.map((el: any, index: any)=>{
                                                       let newObj = {
                                                           id: el.id,
                                                           active: index === 0,
                                                           cardNumber: el.number,
                                                           expiration: el.date,
                                                           cvv: el.cvv,
                                                       }
                                                       return newObj;
                                                   })

                                                   setActiveCard(newArr)
                                               })
                                                   .catch((error)=>{

                                                   })
                                           }).catch((error)=>{

                                           })
                                       }}>
                                           Добавить
                                       </button>
                                   </div>
                               ))}
                           </div> : ''
                       }



                   </div>
               </div>


                <div className="switcher order-switcher">
                    <Switch onchange={updateBonus} active={bonus}/>
                    <button className={`switcher__text ${bonus ? 'switcher__text-active' : ''}`}
                            onClick={(e)=>{setBonus(!bonus)}}
                    >Использовать бонусы</button>
                </div>
                <br/>
                <div className="total-box">
                    <p className="total-box__text"><span>Сумма заказа</span> <span>{total} ₸</span></p>
                    <p className="total-box__text"><span>Начислим бонусов</span> <span>{total * 0.05} ₸</span></p>
                    <p className="total-box__text"><span>Доставка</span> <span>Бесплатно</span></p>
                    <p className="total-box__text total-box__text-t"><span>Всего</span> <span>{total} ₸</span></p>
                    <button onClick={(e)=>{
                        let idAddress = 0;
                        let idCard = 0;
                        activeAddress.forEach((el, index)=>{
                            if(el.active){
                                idAddress = el.id
                            }
                        })
                        activeCard.forEach((el, index)=>{
                            if(el.active){
                                idCard = el.id
                            }
                        })
                        addOrder(idAddress, idCard, comment, String(selectedOption), bonus).then((response)=>{
                            navigator(FINISHED_PAGE_ROUTE)
                        }).catch((error)=>{

                        })

                    }} className="create-order">

                        Оформить заказ
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OrderPage;