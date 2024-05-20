import {$api} from './index';


export const addOrder = async (idAddress: number, cardId: number, comment: string, timeOrder: string, bonus: boolean, idOrders: number[]) => {
    let res;
    if(comment){
        res = await $api.post(`/history/order/add`,{idAddress: idAddress, idCart: cardId, comment: comment, timeOrder: timeOrder, bonus: bonus, idOrders: idOrders });
    }
    else{
        res = await $api.post(`/history/order/add`,{idAddress: idAddress, idCart: cardId, timeOrder: timeOrder, bonus: bonus, idOrders: idOrders });
    }

    return res;
};

export const getHistoryOrders = async () => {
    let res;
    res = await $api.post(`/history/order/`,{isActive: true });
    return res;
};



