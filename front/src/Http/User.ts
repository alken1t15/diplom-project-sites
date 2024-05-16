import {$api} from './index';

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

export const logOut = async () => {
    let res = await $api.post(`logOut/jwt`);
    localStorage.setItem('token', '');
    sessionStorage.setItem('token', '');
    return res;
};