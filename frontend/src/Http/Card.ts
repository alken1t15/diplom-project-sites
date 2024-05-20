import {$api} from './index';

export const getCards = async () => {
    let res;
    res = await $api.get(`cart/`);
    return res;
};

export const addCards = async (number: string, date: string, security: string) => {
    let res;
    res = await $api.post(`cart/add`,{number: number, date: date, security: security});
    return res;
};


