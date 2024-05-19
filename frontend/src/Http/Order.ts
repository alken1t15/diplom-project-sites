import {$api} from './index';


export const addOrder = async (idAddress: number, cardId: number, comment: string, timeOrder: string, bonusActive: boolean) => {
    let res;
    if(comment){
        res = await $api.post(`/history/order/add`,{idAddress: idAddress, cardId: cardId, comment: comment, timeOrder: timeOrder, bonusActive: bonusActive });
    }
    else{
        res = await $api.post(`/history/order/add`,{idAddress: idAddress, cardId: cardId, timeOrder: timeOrder, bonusActive: bonusActive });
    }

    return res;
};


