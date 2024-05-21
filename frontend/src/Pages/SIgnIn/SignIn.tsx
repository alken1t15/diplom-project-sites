import React, {useEffect, useState} from 'react';
import './SignIn.scss'
import Input from "../../Components/UI/Input/Input";
import Switch from "../../Components/UI/Switch/Switch";
import Button from "../../Components/UI/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {MAIN_PAGES_ROUTE, SHOP_PAGE_ROUTE, SIGN_UP_ROUTE} from "../../Utils/Routes";
import {login, logOut} from "../../Http/User";

const SignIn: React.FC = () => {

    let[active, setIsActive] = useState(false);
    let[emailOrNumber, setEmailOrNumber] = useState('');
    let[password, setPassword] = useState('');
    let[remember, setRemember] = useState(true);
    let navigator = useNavigate();

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
        if(password != ' ' && emailOrNumber !== ' ' && emailOrNumber.length >= 2 && password.length >= 2 ){
            setIsActive(true)
        }
    }, [password, emailOrNumber])

    useEffect(()=>{
        localStorage.setItem('already', '1')
    },[])


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
                    {/*<Switch onchange={setRem} active={remember}/>*/}
                    {/*<button className={`switcher__text ${remember ? 'switcher__text-active' : ''}`}*/}
                    {/*        onClick={(e)=>{setRemember(!remember)}}*/}
                    {/*>Запомнить меня</button>*/}
                </div>
            </div>
            <button className={`standard-btn ${active ? 'standard-btn-active' : ''}`} style={{marginTop: 30}} onClick={(e)=>{
                login(emailOrNumber, password).then((response)=>{
                    if(remember){
                        localStorage.setItem('token', response.data['jwt-token']);
                    }
                    else{
                        sessionStorage.setItem('token', response.data['jwt-token']);
                    }
                    navigator(SHOP_PAGE_ROUTE)

                })
                    .catch((error)=>{

                    })
            }} >Войти</button>

        </div>
    );
};

export default SignIn;