import {$api} from './index';

export const getAddresses = async () => {
    let res;
    res = await $api.get(`address/`);
    return res;
};

export const addNewUserAddress = async (street: string, entrance: string, number: string, floor: string, flat: string) => {
    let res;
    res = await $api.post(`address/add`,{street: street, entrance: entrance, number: number, floor: floor, flat: flat});
    return res;
};


