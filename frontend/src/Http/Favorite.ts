import {$api} from './index';



export const addToFavorite = async (idProduct: number) => {
    let res;
    res = await $api.get(`product/favorite/add?idProduct=${idProduct}`);
    return res;
};

export const removeFromFavorite = async (idProduct: number) => {
    let res;
    res = await $api.get(`product/favorite/delete?idProduct=${idProduct}`);
    return res;
};

export const getAllFavorite = async () => {
    let res;
    res = await $api.get(`product/favorite/`);
    return res;
};

