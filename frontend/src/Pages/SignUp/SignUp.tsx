import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SignUp.scss'
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import { SIGN_IN_ROUTE } from "../../Utils/Routes";
import { signUp } from "../../Http/User";

const SignUp: React.FC = () => {

    let [active, setIsActive] = useState(false);
    let [emailOrNumber, setEmailOrNumber] = useState('');
    let [password, setPassword] = useState('');
    let [repeatPassword, setRepeatPassword] = useState('');
    let [name, setName] = useState('');
    let [date, setDate] = useState<Date | null>(null);
    let [formattedDate, setFormattedDate] = useState<string>('');
    let [errorPass, setErrorPass] = useState<undefined | boolean>(undefined);
    let navigator = useNavigate();

    function setEmailOrNum(value: string) {
        setEmailOrNumber(value);
    }

    function setPas(value: string) {
        setPassword(value);
    }

    function setRepeatPas(value: string) {
        setRepeatPassword(value);
    }

    function setDB(value: Date) {
        try{
            const day = String(value.getDate()).padStart(2, '0');
            const month = String(value.getMonth() + 1).padStart(2, '0');
            const year = value.getFullYear();
            const formattedDate = `${day}.${month}.${year}`;
            setDate(value);
            setFormattedDate(formattedDate);
        }
        catch (e){

        }
    }

    function setUserName(value: string) {
        setName(value);
    }

    useEffect(() => {
        if (password === repeatPassword) {
            setErrorPass(false);
        } else {
            setErrorPass(true);
        }
    }, [password, repeatPassword]);

    useEffect(() => {
        if (emailOrNumber.length >= 5 && password.length >= 8 && password === repeatPassword && name.length > 2) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [password, emailOrNumber, repeatPassword, name, date]);

    return (
        <div className="signIn-container">
            <p className="signIn-title">Создать профиль</p>
            <Input length={35} placeholder="Почта или номер" styles={{ marginTop: 15 }} onChangeF={setEmailOrNum} type="text" />
            <Input length={35} placeholder="Введите свое имя" styles={{ marginTop: 15 }} onChangeF={setUserName} type="text" />
            <label className="placeholder-text date-label">Введите дату рождения</label>
            <DatePicker
                className="input"
                selected={date}
                onChange={setDB}
                dateFormat="dd.MM.yyyy"
            />
            <p className="date-text">Важно! Мы дарим скидки и подарки в день рождения.
                К сожалению, день рождения нельзя изменить.</p>
            <Input length={35} placeholder="Пароль" styles={{ marginTop: 15 }} onChangeF={setPas} type="password" />
            <Input length={35} error={errorPass} placeholder="Повторите пароль" styles={{ marginTop: 15 }} onChangeF={setRepeatPas} type="password" />

            <Link to={SIGN_IN_ROUTE} className="signIn-top-text-create" style={{ display: "block", textAlign: "right", marginTop: 15 }}>Войти аккаунт</Link>

            <button className={`signUp-btn ${active ? 'signUp-btn-a': ''}`} onClick={(e)=>{

                if(active) {
                    if (emailOrNumber.includes('@')) {
                        signUp(emailOrNumber, undefined, name, formattedDate, password).then((response) => {
                            navigator(SIGN_IN_ROUTE)
                        }).catch((error) => {
                        });
                    }
                    else{
                        signUp(undefined, emailOrNumber, name, formattedDate, password).then((response) => {
                            navigator(SIGN_IN_ROUTE)
                        }).catch((error) => {
                        });

                    }

            }}}>Зарегистрироваться</button>

        </div>
    );
};

export default SignUp;
