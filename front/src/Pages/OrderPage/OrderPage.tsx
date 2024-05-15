import React, {useEffect, useState} from 'react';


import './OrderPage.scss';
import Input from "../../Components/UI/Input/Input";
const imgSvg = require('../../assets/images/chevron.backward.svg').default;

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
            cardName: 'Max',
            cardNumber: '222',
            expiration: '333',
            cvv: '444',
        },
        {
            id: 2,
            active: false,
            cardName: '999',
            cardNumber: '888',
            expiration: '777',
            cvv: '444',
        },
    ])
    let[visBlockWithCard, setVisBlockWithCard] =useState(false)
    let[cardName, setCardName] = useState('')
    let[cardNumber, setCardNumber] = useState('')
    let[expiration, setExpiration] = useState('')
    let[cvv, setCvv] = useState('')
    let[addNewCard, setAddNewCard] = useState(false)

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
        <div>
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


                <p className="cart__title">Оплата</p>
                <div className="info-box-r" style={{marginLeft: 0}}>
                    <div className="person-info-block-label">Выберите способ оплаты</div>
                    {cardActive ?
                        <div>
                            {activeCard.map((el, index)=>(
                                <div className={`added-info-box ${el.active ? '' : 'added-info-box-hidden'}`} key={index}>
                                    <div className="added-info-item" style={{marginTop: 0}}>
                                        <input value={cardNumber !== '' ? cardNumber : el.cardNumber} onChange={(e)=>{
                                            setCardNumber( e.target.value);
                                        }} type="text" className="added-info-item__input"/>
                                    </div>
                                    <div className="added-info-item">
                                        <input value={expiration !== '' ? expiration : el.expiration} onChange={(e)=>{
                                            setExpiration(e.target.value);
                                        }} type="text" className="added-info-item__input"/>
                                    </div>
                                    <div className="added-info-item">
                                        <input value={cardName !== '' ? cardName : el.cardName} onChange={(e)=>{
                                            setCardName(e.target.value);
                                        }} type="text" className="added-info-item__input"/>
                                    </div>
                                    <div className="added-info-item">
                                        <input value={cvv !== '' ? cvv : el.cvv} onChange={(e)=>{
                                            setCvv(e.target.value);
                                        }} type="text" className="added-info-item__input"/>
                                    </div>
                                    <button className={`added-info__button ${btnAddCardActive ? 'added-info__button-a' : ''}`} onClick={(e)=>{
                                        setBtnAddCardActive(false);
                                        setCardActive(false);
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
                                                 console.log(newArr)
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
    );
};

export default OrderPage;