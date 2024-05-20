import {$api} from './index';

export const getAddresses = async () => {
    let res;
    res = await $api.get(`address/`);
    return res;
};

export const addNewAddress = async (street: string, entrance: number, number: string, floor: number, flat: number) => {
    let res;
    res = await $api.post(`cart/add`,{street: street, entrance: entrance, number: number, floor: floor, flat: flat});
    return res;
};


