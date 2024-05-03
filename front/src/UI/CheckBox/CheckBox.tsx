import React, {useState} from 'react';
import './CheckBox.scss'

const check = require('../../assets/images/Check.svg').default
interface ICheckBox{
    change: (value: boolean) => void;
}

const CheckBox: React.FC<ICheckBox> = ({change}) => {
    let[state, setState] = useState(false);

    return (
        <button className={`checkbox`} onClick={(e)=>{
            setState(!state)
            change(!state)
        }}>
            <div className={`checkbox-fill ${state ? 'checkbox-fill-t' : 'checkbox-fill-f'}`}>
                {state ? <img src={check}/> : <></>}
            </div>
        </button>
    );
};

export default CheckBox;