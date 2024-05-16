import {$api} from './index';

export const getCards = async () => {
    let res;
    res = await $api.get(`cart/`);
    return res;
};

export const addCards = async (number: number, date: string, security: number) => {
    let res;
    res = await $api.post(`cart/add`,{number: number, date: date, security: security});
    return res;
};


