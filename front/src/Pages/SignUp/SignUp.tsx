import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
    let[repeatPassword, setRepeatPassword] = useState('')
    let[name, setName] = useState('')
    let[date, setDate] = useState<Date | null>()
    let[errorPass, setErrorPass] = useState<undefined | boolean>(undefined)

    function setEmailOrNum(value: string){
        setEmailOrNumber(value)
    }

    function setPas(value: string){
        setPassword(value)
    }

    function setRepeatPas(value: string){
        setRepeatPassword(value)
    }

    function setDB(value: Date){
        setDate(value)
    }

    function setUserName(value: string){
        setName(value)
    }


    useEffect(()=>{
        if(password === repeatPassword){
            setErrorPass(false)
        }
        else{
            setErrorPass(true)
        }
    }, [password, repeatPassword])

    useEffect(()=>{
        if(emailOrNumber.length >= 8 && password.length >= 8 &&  password === repeatPassword && name.length > 2 && date){
            setIsActive(true)
        }
        else{
            setIsActive(false)
        }
    }, [password, emailOrNumber, repeatPassword])


    return (
        <div className={`signIn-container`}>
            <p className="signIn-title">Создать профиль</p>
            <Input length={35} placeholder={'Почта или номер'} styles={{marginTop: 15}} onChangeF={setEmailOrNum} type={'text'}/>
            <Input length={35} placeholder={'Введите свое имя'} styles={{marginTop: 15}} onChangeF={setName} type={'text'}/>
            <label className={`placeholder-text date-label`}>Введите дату рождения</label>
            <DatePicker
                className={`input`}
                selected={date}
                onChange={setDB}
                dateFormat="dd.MM.yyyy"
            />
            <p className={'date-text'}>Важно! Мы дарим скидки и подарки в день рождения.
                К сожалению, день рождения нельзя изменить.</p>
            <Input length={35} placeholder={'Пароль'} styles={{marginTop: 15}} onChangeF={setPas} type={'password'}/>
            <Input length={35} error={errorPass} placeholder={'Повторите пароль'} styles={{marginTop: 15}} onChangeF={setRepeatPas} type={'password'}/>

            <Button isActive={active}  onClick={(e)=>{

            }} name={'Зарегистрироваться'} style={{marginTop: 30}}/>
        </div>
    );
};

export default SignUp;