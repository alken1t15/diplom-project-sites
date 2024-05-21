import {$api, $host} from './index';
import {SIGN_IN_ROUTE} from "../Utils/Routes";


export const login = async (login: string, password: string) => {
    let res;
    if(login.includes('+')){
        res = await $host.post(`login/jwt`, {"phone": login, "password": password});
    }
    else{
        res = await $host.post(`login/jwt`, {"login": login, "password": password});
    }

    return res;
};

export const signUp = async (email?: string, phone?: string, name?: string, db?: string, password?: string) => {
    let res;
    if(email){
        res = await $host.post(`login/add`, {"email": email, firstName: name, "bornDate": db, "password": password, "role":"user"});
    }
    else if(phone){
        res = await $host.post(`login/add`, {"phone": phone, firstName: name, "bornDate": db, "password": password, "role":"user"});
    }

    return res;
};

export const getInfo = async () => {
    let res;
    res = await $api.get(`login/info`);
    return res;
};

export const getPersonalInfo = async () => {
    let res;
    res = await $api.get(`login/`);
    return res;
};

export const deleteUser = async () => {
    let res;
    res = await $api.get(`login/remove`);
    return res;
};



export const logOut = () => {
    localStorage.setItem('token', '');
    sessionStorage.setItem('token', '');
    window.location.href = SIGN_IN_ROUTE;
};