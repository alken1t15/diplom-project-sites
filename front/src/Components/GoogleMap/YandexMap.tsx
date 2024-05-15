import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import './YandexMap.scss';

interface MapPin {
    coordinates: number[];
    address: string;
    hours: string;
    phoneNumber: string;
    name: string;
    img: any;
}

const place1 = require('../../assets/images/pl1.png');
const place2 = require('../../assets/images/pl2.png');
const place3 = require('../../assets/images/pl3.png');
const place4 = require('../../assets/images/pl4.png');
const svg1 = require('../../assets/images/Icon (1).png');
const svg2 = require('../../assets/images/Icon (2).png');
const svg3 = require('../../assets/images/Icon (3).png');

const YandexMap: React.FC = () => {
    const [pins, setPins] = useState<MapPin[]>([]);

    useEffect(() => {

        const pinsData: MapPin[] = [
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

        ];

        setPins(pinsData);

    }, []);

    return (
        <YMaps>
            <Map
                defaultState={{ center: [51.153362, 71.419449], zoom: 10 }}
                width="100%"
                height="60vh"
            >
                {pins.map((pin, index) => (
                    <Placemark
                        modules={["geoObject.addon.balloon"]}
                        key={index}
                        geometry={pin.coordinates}
                        properties={{
                            balloonContentBody: `
                <div class="info-block">
                    <div class="info-block-l">
                        <img src=${pin.img} class="info-block-l" alt="">
                    </div>
                    <div class="info-block-r">
                          <p class="line"><img src=${svg1} className="svg svg1"><span>${pin.address}</span></p>
                          <p class="line"><img src=${svg2} className="svg svg2"><span>${pin.hours}</span></p>
                          <p class="line"><img src=${svg3} className="svg svg3"><span>${pin.phoneNumber}</span></p>
                    </div>
                </div>
              `,
                        }}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: require('../../assets/images/Icon.png'),
                            iconImageSize: [34, 55],
                            iconImageOffset: [-17, -55],
                        }}
                    />
                ))}
            </Map>
        </YMaps>
    );
};

export default YandexMap;
