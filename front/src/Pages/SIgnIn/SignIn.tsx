import React, {useEffect, useState} from 'react';
import './SignIn.scss'
import Input from "../../UI/Input/Input";
import Switch from "../../UI/Switch/Switch";
import Button from "../../UI/Button/Button";
import {Link} from "react-router-dom";
import {SIGN_UP_ROUTE} from "../../Utils/Routes";
import {logOut} from "../../Http/User";

const SignIn: React.FC = () => {

    let[active, setIsActive] = useState(false);
    let[emailOrNumber, setEmailOrNumber] = useState('')
    let[password, setPassword] = useState('')
    let[remember, setRemember] = useState(false)

    function setEmailOrNum(value: string){
        setEmailOrNumber(value)
    }

    function setPass(value: string){
        setPassword(value)
    }

    function setRem(value: boolean) {
        setRemember(value)
    }

    useEffect(()=>{
        if(password != ' ' && emailOrNumber !== ' ' && emailOrNumber.length >= 8 && password.length >= 8 ){
            setIsActive(true)
        }
    }, [password, emailOrNumber])


    return (
        <div className={`signIn-container`}>
            <p className="signIn-title">Создать профиль</p>
            <p className="signIn-top-text">
                <span className="signIn-top-text-new">Новый пользователь?</span>
                <Link to={SIGN_UP_ROUTE} className="signIn-top-text-create">Создать аккаунт</Link>
            </p>
            <Input length={35} placeholder={'Почта или номер'} styles={{marginTop: 15}} onChangeF={setEmailOrNum} type={'text'}/>
            <Input length={35} placeholder={'Пароль'} styles={{marginTop: 15}} onChangeF={setPass} type={'password'}/>
            <div className="signIn-bot">
                <div className="switcher">
                    <Switch onchange={setRem} active={remember}/>
                    <button className={`switcher__text ${remember ? 'switcher__text-active' : ''}`}
                            onClick={(e)=>{setRemember(!remember)}}
                    >Запомнить меня</button>
                </div>
                <p className="signIn-bot-forgot">Забыли пароль?</p>
            </div>
            <Button isActive={active} onClick={(e)=>{

            }} name={'Войти'} style={{marginTop: 30}}/>
        </div>
    );
};

export default SignIn;