import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

interface MapPin {
    coordinates: number[];
    address: string;
    hours: string;
    phoneNumber: string;
}

const YandexMap: React.FC = () => {
    const [pins, setPins] = useState<MapPin[]>([]);

    useEffect(() => {

        const pinsData: MapPin[] = [
            {
                coordinates: [55.753215, 37.622504],
                address: 'Москва, Россия',
                hours: '9:00 - 18:00',
                phoneNumber: '+7 123-456-7890',
            },
        ];

        setPins(pinsData);
    }, []);

    return (
        <YMaps>
            <Map
                defaultState={{ center: [55.753215, 37.622504], zoom: 10 }}
                width="100%"
                height="400px"
            >
                {pins.map((pin, index) => (
                    <Placemark
                        key={index}
                        geometry={pin.coordinates}
                        properties={{
                            balloonContentBody: `
                <div>
                  <p><strong>Адрес:</strong> ${pin.address}</p>
                  <p><strong>Время работы:</strong> ${pin.hours}</p>
                  <p><strong>Телефон:</strong> ${pin.phoneNumber}</p>
                </div>
              `,
                        }}
                        options={{
                            iconLayout: 'default#image',
                            iconImageHref: require('../../assets/images/Icon.png'),
                            iconImageSize: [30, 30],
                        }}
                    />
                ))}
            </Map>
        </YMaps>
    );
};

export default YandexMap;
