const {findAll, findOne, insertOne, updateOne, deleteAll, deleteOne, deleteSome} = require("../DB/Base");
const {ObjectId} = require("mongodb");
const jwt = require('jsonwebtoken');
const dataBaseName = "E-commerce";
const collectionName = "orders";
const collection2Name = "users";

class OrderService {

    async listOrders() {return findAll(dataBaseName, collectionName);}

    async listOrdersUserMake(token) {
        try {
            //get id of the user from token
            let id = await this.getUserIdFromToken(token);

            //return all orders done by this user
            return findAll(dataBaseName, collectionName, {"userId": id});
        } catch (e) {
            return null
        }
    }

    async listOrderById(id) {
        try {
            return await findAll(dataBaseName, collectionName, {"userId": id});
        } catch (e) {
            return null;
        }
    }

    async createOrder(token, data) {
        let time = new Date().toLocaleString().replaceAll('/', '-').replaceAll(':', '.');
        try {
            let id = await this.getUserIdFromToken(token);
            data.isActive = true;
            data.userId = id;
            data.date = time;
            return await insertOne(dataBaseName, collectionName, data);
        } catch (e) {
            return null;
        }
    }

    async deleteAllOrders() {
        try {
            return await deleteAll(dataBaseName, collectionName);
        } catch (e) {
            return null;
        }

    }

    async deleteOrder(id) {
        let order = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)})
        if (!order) {
            return null
        } else {
            return await deleteOne(dataBaseName, collectionName, {_id: ObjectId(id)})
        }
    }

    async deleteOrdersBySpecificUser(id) {
        let user = await findOne(dataBaseName, collection2Name, {_id: ObjectId(id)});
        if(!user){
            return "user not found"
        }else{
            let order = await findAll(dataBaseName, collectionName, {userId: id});
            if (!order) {
                return null
            } else {
                try {
                    return await deleteSome(dataBaseName, collectionName, {userId: id});
                } catch (e) {
                    return null;
                }
            }
        }
    }
    async getUserIdFromToken(token) {
        let decoded = jwt.verify(token, 'shhhhh');
        let id = decoded.id;
        return id;
    }
}

module.exports = {
    OrderService
}