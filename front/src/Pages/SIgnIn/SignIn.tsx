import React, {useEffect, useState} from 'react';
import './SignIn.scss'
import Input from "../../UI/Input/Input";

const SignIn: React.FC = () => {

    let[active, setIsActive] = useState(false);
    let[emailOrNumber, setEmailOrNumber] = useState('')
    let[password, setPassword] = useState('')

    function setEmailOrNum(value: string){
        setEmailOrNumber(value)
    }

    function setPass(value: string){
        setPass(value)
    }

    useEffect(()=>{
        if(password != ' ' && emailOrNumber !== ' ' && emailOrNumber.length >= 8 && password.length >= 8 ){
            setIsActive(true)
        }
    }, [password, emailOrNumber])




    return (
        <div className={`signIn-container`}>
            <p className="signIn-title">Войти</p>
            <p className="signIn-top-text">
                <span className="signIn-top-text-new">Новый пользователь?</span>
                <span className="signIn-top-text-create">Создать аккаунт</span>
            </p>
            <Input length={35} placeholder={'Почта или номер'} styles={{marginTop: 15}} onChange={setEmailOrNum} type={'text'}/>
            <Input length={35} placeholder={'Пароль'} styles={{marginTop: 15}} onChange={setPass} type={'password'}/>

        </div>
    );
};

export default SignIn;