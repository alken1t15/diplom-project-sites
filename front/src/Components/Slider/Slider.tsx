import React, {useEffect, useState} from 'react';
import './Slider.scss';
interface ISliderItem{
    id: number;
    name: string;
    active: boolean;
}

interface ISlider{
    items: ISliderItem[];
    onChange: (id: number) => void;
}



const Slider: React.FC<ISlider> = (props) => {
    let[items, setItems] = useState(props.items)


    useEffect(()=>{
        setItems(props.items)
    }, [props])

    return (
        <div className={`slider-box`}>
            {items.map((el, index)=>(
                <button onClick={(e)=>{
                    props.onChange(el.id)
                }}
                        className={`slider-box-btn ${el.active ? 'slider-box-btn-a' : ''}`}>{el.name}</button>
            ))}
        </div>
    );
};

export default Slider;