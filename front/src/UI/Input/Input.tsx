import React, {CSSProperties, FC, useState} from 'react';
import './Input.scss';
import {logOut} from "../../Http/User";
const eye =  require('../../assets/images/eye.slash.svg').default
const eyeOpen =  require('../../assets/images/eyeOpen.svg').default

interface InputProps {
    placeholder: string;
    onChange: (value: string) => void;
    type: string;
    styles?: CSSProperties;
    email?: boolean;
    phone?: boolean;
    password?: boolean;
    length?: number
}

const Input: React.FC<InputProps> = ({ placeholder,onChange, type , length,styles, email, phone, password}) => {
    const [value, setValue] = useState('');
    const [hiddenValue, setHiddenValue] = useState('');
    const [isActive, setIsActive] = useState(false)

    const isEmailOrPhoneFilled = (): boolean => {
        if (email && !value.includes('@')) {
            return false;
        }
        if (phone && value.length < 10) {
            return false;
        }
        return true;
    };

    const isPasswordSecure = (): boolean => {
        if (value.length < 8) {
            return false;
        }
        if (!/\d/.test(value)) {
            return false;
        }
        if (!/[A-Z]/.test(value)) {
            return false;
        }
        if (!/[a-z]/.test(value)) {
            return false;
        }
        if (!/[!@#$%^&*]/.test(value)) {
            return false;
        }
        return true;
    };

    function inputChange(e: React.ChangeEvent<HTMLInputElement>){

        if(type === 'password'){
            if(value.length < e.target.value.length || value.length == e.target.value.length){
                let str = e.target.value;
                let arr = str.split('');
                let lastChar = arr[e.target.value.length-1]
                let val = value.split('')
                val.push(lastChar)
                setValue(val.join(''))
            }
            else if(value.length > e.target.value.length){
                let val = value.split('')
                val.pop()
                setValue(val.join(''))
            }
        }
        else {

            setValue(e.target.value)
        }
    }


    function setActive(){
        setIsActive(!isActive)
    }

    return (
        <div className={`input-container`} style={styles}>
            <label className={'placeholder-text'}>{placeholder}</label>
            {type === 'password' ?
                <div className={'input-with-eye'}>
                    <input
                        className={`input input-password`}
                        value={isActive ? value : value.replace(/./g, "*")}
                        onChange={(e) => inputChange(e)}
                        maxLength={length}
                    />
                    <button className={`eye`} onClick={setActive}>
                        {isActive ? <img src={eyeOpen} className={'eye-img fade-in'}/> : <img src={eye} className={'eye-img fade-in'}/>}

                    </button>
                </div>

                :
              <div>
                  <input
                      className={`input`}
                      type={type}
                      value={value}
                      onChange={(e) => inputChange(e)}
                      maxLength={length}
                  />
              </div>
            }

        </div>
    );
};

export default Input;
