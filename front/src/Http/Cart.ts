import {$api} from './index';



export const addToCart = async (productId: number, count: number) => {
    let res;
    res = await $api.post(`order/add`,{count: count, productId: productId});
    return res;
};

export const getCartItems = async () => {
    let res;
    res = await $api.get(`order/`);
    return res;
};

export const updateCartItemCount = async (id: number, status: string) => {
    let res;
    res = await $api.post(`order/edit-count`,{id: id, status: status});
    return res;
};
