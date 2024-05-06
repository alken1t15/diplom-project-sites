import React, {useEffect, useState} from 'react';
import './SignUp.scss'
import Input from "../../UI/Input/Input";
import Switch from "../../UI/Switch/Switch";
import Button from "../../UI/Button/Button";
import {Link} from "react-router-dom";
import {SIGN_IN_ROUTE} from "../../Utils/Routes";

const SignUp: React.FC = () => {

    let[active, setIsActive] = useState(false);
    let[emailOrNumber, setEmailOrNumber] = useState('')
    let[password, setPassword] = useState('')
    let[remember, setRemember] = useState(false)

    function setEmailOrNum(value: string){
        setEmailOrNumber(value)
    }



    useEffect(()=>{
        // console.log(password !== '')
        // console.log(emailOrNumber.length >= 8)
        // console.log(password.length >= 8)
        if(password != '' && emailOrNumber != '' && emailOrNumber.length >= 8 && password.length >= 8 ){
            setIsActive(true)
        }
        else{
            setIsActive(false)
        }
    }, [password, emailOrNumber])


    return (
        <div className={`signIn-container`}>
            <p className="signIn-title">Войти</p>
            <p className="signIn-top-text">
                <span className="signIn-top-text-new">Уже зарегистрированы?</span>
                <Link to={SIGN_IN_ROUTE} className="signIn-top-text-create">Войти в аккаунт</Link>
            </p>
            {/*<Input length={35} placeholder={'Почта или номер'} styles={{marginTop: 15}} onChange={setEmailOrNum} type={'text'}/>*/}
            {/*<Input length={35} placeholder={'Пароль'} styles={{marginTop: 15}} onChange={setPass} type={'password'}/>*/}
            {/*<div className="signIn-bot">*/}
            {/*    <div className="switcher">*/}
            {/*        <Switch onchange={setRem} active={remember}/>*/}
            {/*        <button className={`switcher__text ${remember ? 'switcher__text-active' : ''}`}*/}
            {/*                onClick={(e)=>{setRemember(!remember)}}*/}
            {/*        >Запомнить меня</button>*/}
            {/*    </div>*/}
            {/*    <p className="signIn-bot-forgot">Забыли пароль?</p>*/}
            {/*</div>*/}
            <Button isActive={active}  onClick={(e)=>{

            }} name={'Войти'} style={{marginTop: 30}}/>
        </div>
    );
};

export default SignUp;