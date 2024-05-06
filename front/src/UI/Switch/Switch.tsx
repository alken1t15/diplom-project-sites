import React, {CSSProperties, useEffect, useState} from 'react';
import './Switch.scss'


interface ISwitch{
    onchange: (value: boolean)=> void;
    styles?: CSSProperties;
    active: boolean
}

const Switch: React.FC<ISwitch> = (props) => {
    const [checked, setChecked] = useState(props.active);

    useEffect(()=>{
        setChecked(props.active)
    }, [props])

    const toggleSwitch = () => {
        setChecked(!checked);
        props.onchange(!checked);
    };

    return (
        <div className={`switch ${checked ? 'checked' : ''}`} style={props.styles} onClick={toggleSwitch}>
            <div className="slider"></div>
        </div>
    );
};

export default Switch;