const {findAll, findOne, insertOne, deleteOne ,updateOneByQuery, deleteAll, updateAll} = require("../DB/Base");
const jwt = require('jsonwebtoken');
const dataBaseName = "ZobaStore";
const collectionName = "carts";

class CartService {

    //list all carts
    async listAllCarts(){
        try {
            return await findAll(dataBaseName,collectionName);
        }catch (e){
            return null
        }
    }

    //get cart of specific user
    async listCartByUserId(id) {
        try {
            return await findOne(dataBaseName,collectionName,{userId :id});
        }catch(e) {
            return null;
        }
    }

    //get cart of user login now
    async listCartOfUserLoginNow(token) {
        try {
            let id = await this.getUserIdFromToken(token);
            return await findOne(dataBaseName,collectionName,{userId :id});
        }catch(e) {
            return null;
        }
    }

    //create cart
    async addToCart(token,data) {
        try {
            //1-get id of the user from token
            let id = await this.getUserIdFromToken(token);

            //2-check if the user has cart or no
            let cart = await findOne(dataBaseName,collectionName,{userId : id});

            /* 3-check if user has cart before or no
                * if user don't have, we will create cart for him
                * if user has cart, we will update cart of him by adding new item
            */

            if(!cart){
                data.userId = id;
                data.isActive = true;
                return await insertOne(dataBaseName,collectionName,data);
            }else{
                let newData = cart.items;
                newData.push(data);
                return await updateOneByQuery(dataBaseName,collectionName,{userId :id},
                    {items: newData});
            }
        }catch (e) {
            return null;
        }
    }

    //delete specific cart
    async deleteCart(id) {
        let cart = await findOne(dataBaseName,collectionName,{userId :id})
        if(!cart){
            return null
        }else{
            return await deleteOne(dataBaseName,collectionName,{userId :id})
        }
    }

    //delete all carts
    async deleteAllCarts(){
        try {
            return await deleteAll(dataBaseName,collectionName);
        }catch (e) {
            return null;
        }
    }

    //delete cart items for specific user
    async deleteCartItemsForUser(id) {
        let cart = await findOne(dataBaseName,collectionName,{userId : id});
        if(!cart){
            return null
        }else{
            cart.items.length = 0;
            await this.deleteCart(id);
            return await insertOne(dataBaseName,collectionName,cart);
        }
    }

    //delete cart items for user login now
    async deleteCartItemsForUserLoginNow(token) {
        try {
            let id = await this.getUserIdFromToken(token);
            return await deleteOne(dataBaseName,collectionName,{userId :id});
        }catch(e) {
            return null;
        }
    }

    // delete all items in cart for all users
    async deleteAllCartItemsForAllUsers(){
        try {
            let carts = await findAll(dataBaseName,collectionName);
            if(!carts){
                return null
            }else{
                for (let i of carts){
                    await updateOneByQuery(dataBaseName,collectionName,{userId: i.userId},
                        {items : []});
                }
            }
        }catch (e) {
            return null;
        }
    }

    // delete specific item in cart for specific user
    async deleteItemInCartForSpecificUser(id,barcode){
        let cart = await findOne(dataBaseName,collectionName, {userId : id});
        if(!cart){
            return null;
        }else{
            for (let i = 0; i < cart.items.length; i++){
                if(cart.items[i].barcode === barcode.barcode){
                    cart.items.splice(i,1);
                    await this.deleteCart(id);
                    return await insertOne(dataBaseName,collectionName,cart);
                }
           }
        }
    }

    // delete specific item in cart for user login now
    async deleteItemInCartOfUserLoginNow(token,barcode){
        let id = await this.getUserIdFromToken(token);
        let result = await this.deleteItemInCartForSpecificUser(id,barcode);
        return result
    }

    /*
    // delete specific item in carts of all users
    async deleteItemInCartsOfAllUsers(barcode){
        try {
            let carts = await findAll(dataBaseName,collectionName);
            if(!carts){
                return null
            }else{
                for (let i =0; i < carts.length; i++){
                    for(let j=0; j <carts[i].items.length; j++){
                        // console.log(carts[i])
                        // console.log(carts[i].items)
                        // console.log(carts[i].items[j])
                        if(carts[i].items[j].barcode === barcode.barcode){
                            // console.log(j)
                            // console.log(carts[i].items[j])
                            carts[i].items.splice(j,1);
                            // console.log(carts[i].items)
                            // console.log(carts[i].userId)
                            return await updateOneByQuery(dataBaseName,collectionName,{userId: carts[i].userId},
                                {items : carts[i].items});
                        }
                    }
                }
            }
        }catch (e) {
            return null;
        }
    }

     */

    async changeCartStatus(id) {
        let cart = await findOne(dataBaseName,collectionName,{userId: id});
        if(!cart){
            return null;
        }
        if(!cart.isActive || cart.isActive === false){
            return await updateOneByQuery(dataBaseName,collectionName,{userId: id}, {isActive : true});
        }
        else{
            return await updateOneByQuery(dataBaseName,collectionName,{userId: id}, {isActive : false});
        }
    }

    //update item in cart of specific user
    async updateItemInCartForSpecificUser(id,data){
        let cart = await findOne(dataBaseName,collectionName,{userId: id});
        if(!cart){
            return null;
        }else{
            let keyGet = Object.keys(data);
            for(let j = 0; j < cart.items.length; j++){
                for(let k of Object.keys(cart.items[j])) {
                    keyGet.forEach((value) => {
                        if (value !== "barcode") {
                            if (value === k) {
                                if (data.barcode === cart.items[j].barcode) {
                                    cart.items[j][k] = data[value];
                                    console.log(cart.items[j]);
                                }
                            }
                        }
                    })
                }
            }
            return await updateOneByQuery(dataBaseName,collectionName,{userId: id},
                {items : cart.items});
        }
    }

    //update item in cart for user login now
    async updateItemInCartForUserLoginNow(token,data){
        try {
            let id = await this.getUserIdFromToken(token);
            let result = await this.updateItemInCartForSpecificUser(id,data);
            return result;
        }catch(e) {
            return null;
        }
    }


/*
    //update specific item in all carts of all users
    async updateItemInCartForAllUsers(data){
        let carts = await findAll(dataBaseName,collectionName);
        let keyGet = Object.keys(data);
        if(!carts){
            return null;
        }else{
            for(let i = 0; i < carts.length; i++){
                for(let j = 0; j < carts[i].items.length; j++){
                    for(let k of Object.keys(carts[i].items[j])) {
                        keyGet.forEach((value) => {
                                if (value === k) {
                                    carts[i].items[j][k] = data[value];
                                }
                        })
                    }
                }
                await updateAll(dataBaseName,collectionName,{items :carts[i].items});
            }
        }
    }
*/

    //update other data of user cart
    async updateCartDataOfUser(id,data){
        try {
            let cart = await findOne(dataBaseName,collectionName,{userId : id})
            if(!cart){
                return null;
            }else{
                return await updateOneByQuery(dataBaseName,collectionName,{userId : id}, data);
            }
        }catch (e) {
            return null
        }
    }

async getUserIdFromToken(token){
    let decoded = jwt.verify(token, 'shhhhh');
    return decoded.id;
    }


}

module.exports = {
    CartService,
}