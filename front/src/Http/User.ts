import {$api} from './index';
import {SIGN_IN_ROUTE} from "../Utils/Routes";


export const login = async (login: string, password: string) => {
    let res = await $api.post(`login/jwt`, {"login": login, "password": password});
    return res;
};

export const signUp = async (email: string, phone: string, name: string, db: string, password: string) => {
    let res;
    if(email){
        res = await $api.post(`login/add`, {"email": email, name: name, "db": db, "password": password});
    }
    else if(phone){
        res = await $api.post(`login/add`, {"phone": phone, name: name, "db": db, "password": password});
    }

    return res;
};

export const logOut = () => {
    localStorage.setItem('token', '');
    sessionStorage.setItem('token', '');
    window.location.href = SIGN_IN_ROUTE;
};