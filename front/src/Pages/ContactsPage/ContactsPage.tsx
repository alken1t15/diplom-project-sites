import React, {useState} from 'react';

import './ContactsPage.scss'
import YandexMap from "../../Components/GoogleMap/YandexMap";
import Slider from "../../Components/Slider/Slider";

const place1 = require('../../assets/images/pl1.png');
const place2 = require('../../assets/images/pl2.png');
const place3 = require('../../assets/images/pl3.png');
const place4 = require('../../assets/images/pl4.png');
const svg1 = require('../../assets/images/Icon (1).png');
const svg2 = require('../../assets/images/Icon (2).png');
const svg3 = require('../../assets/images/Icon (3).png');
const ContactsPage: React.FC = () => {
    let[sliderItems ,setSliderItems] = useState([
        {
          id: 1,
          name: 'Карта',
          active: true,

        },
        {
            id: 2,
            name: 'Лист',
            active: false,

        },
    ])

    let[activeSlider, setActiveSlider] = useState(1)
    let[place, setPlace] = useState([
        {
            coordinates: [51.153362, 71.419449],
            address: 'Астана, Казахстан',
            hours: '9:00 - 22:00',
            name: 'Центральный парк',
            phoneNumber: '8 (775) 999-87-55',
            img: place1
        },
        {
            coordinates: [51.148343, 71.459588],
            address: 'Тауелсиздик, 12',
            hours: '9:00 - 22:00',
            name: 'Тауелсиздик, 12',
            phoneNumber: '8 (775) 999-87-55',
            img: place2
        },
        {
            coordinates: [51.177702, 71.417547],
            address: 'Бейбитшилик, 39',
            hours: '9:00 - 22:00',
            name: 'Бейбитшилик, 39',
            phoneNumber: '8 (775) 999-87-55',
            img: place3
        },
        {
            coordinates: [51.128840, 71.226287],
            address: 'Калдаякова, 12',
            hours: '9:00 - 22:00',
            name: 'Калдаякова, 12',
            phoneNumber: '8 (775) 999-87-55',
            img: place4
        },

    ])
    function updateActiveSlider(id: number){
        let newArr =sliderItems.map((el, index)=>{
            el.active = el.id === id;
            return el;
        })
        setSliderItems(newArr)
        if(id === 1){
            setActiveSlider(1)
        }
        else if(id === 2){
            setActiveSlider(2)
        }

    }
    return (
        <div style={{marginTop: 50}}>
            <div className="container" style={{flexWrap: 'wrap'}}>
                <Slider onChange={updateActiveSlider} items={sliderItems}/>
                {activeSlider === 1 ? <YandexMap/> : <>

                    <div className="contact-items-container">
                        <div className="contact-items-container-l">
                            {place.map((el, index)=>(
                                <div className="info-block" style={{marginTop: 25,}}>
                                    <div className="info-block-l">
                                        <img src={el.img} className="info-block-l" alt=""/>
                                    </div>
                                    <div className="info-block-r">
                                        <p className="line"><img src={svg1} className="svg svg1"/><span>{el.address}</span></p>
                                        <p className="line"><img src={svg2} className="svg svg2"/><span>{el.hours}</span></p>
                                        <p className="line"><img src={svg3} className="svg svg3"/><span>{el.phoneNumber}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="contact-items-container-r"></div>

                    </div>

                </>}


            </div>
        </div>
    );
};

export default ContactsPage;