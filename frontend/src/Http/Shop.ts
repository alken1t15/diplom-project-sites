import {$api} from './index';



export const getShopItems = async (idCategory: string, name: string) => {
    let res;
    if(idCategory !== "" && name !== ""){
        res = await $api.get(`product/?name=${name}&idCategory=${idCategory}`);
    }
    else if(idCategory){
        res = await $api.get(`product/?idCategory=${idCategory}`);
    }
    else if(name){
        res = await $api.get(`product/?name=${name}`);
    }
    else{
        res = await $api.get(`product/`);
    }

    return res;
};

export const getShopItem = async (id: number) => {
    let res;
    res = await $api.get(`product/${id}`);
    return res;
};

