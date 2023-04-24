const {findAll, findOne, insertOne, updateOne, deleteOne, deleteAll,deleteSome} = require("../DB/Base");
const {ObjectId} = require("mongodb");
const dataBaseName = "ZobaStore";
const collectionName = "products";

class ProductService {
    async listProducts() {
        try {
            return await findAll(dataBaseName, collectionName);
        } catch (e) {
            return null;
        }
    }
    async listProductsHaveSale() {
        try {
            return await findAll(dataBaseName, collectionName, {"salePercentage": {$gt: 0}});
        } catch (e) {
            return null;
        }
    }
    async listAvailableProducts() {
        try {
            return await findAll(dataBaseName, collectionName, {"count": {$gt: 0}});
        } catch (e) {
            return null;
        }
    }
    async listOneProduct(id) {
        try {
            return await findOne(dataBaseName, collectionName, {_id: ObjectId(id)});
        } catch (e) {
            return null;
        }
    }
    async listProductByGeneralCategoryId(id) {
        try {
            return await findAll(dataBaseName,collectionName,{generalCategoryId : id});
        }catch(e) {
            return null;
        }
    }
    async listProductByCategoryId(c_id) {
        try {
            return await findAll(dataBaseName,collectionName,{categoryId : c_id});
        }catch(e) {
            return null;
        }
    }
    async createProduct(data) {
        try {
            data.isActive = true;
            let generalCategory = await findOne(dataBaseName, "generalCategories",
                {barcode: data.generalCategoryBarcode});
            data.generalCategoryId = generalCategory._id.toString();

            let category = await findOne(dataBaseName, "categories",
                {barcode: data.categoryBarcode});
            data.categoryId = category._id.toString();

            return await insertOne(dataBaseName, collectionName, data);

        } catch (e) {
            return null;
        }
    }
    async updateProduct(id, data) {
        let product = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)})
        if (!product) {
            return null;
        } else {
            return await updateOne(dataBaseName, collectionName, id, data);
        }
    }
    async changeStatues(id) {
        let product = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)})
        if (!product) {
            return null
        }
        if (!product.isActive || product.isActive === false) {
            return await updateOne(dataBaseName, collectionName, id, {isActive: true})
        } else {
            return await updateOne(dataBaseName, collectionName, id, {isActive: false})
        }
    }
    async deleteProduct(id) {
        let product = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)})
        if (!product) {
            return null
        } else {
            return await deleteOne(dataBaseName, collectionName, {_id: ObjectId(id)})
        }
    }
    async deleteAllProducts() {
        try {
            return await deleteAll(dataBaseName, collectionName);
        } catch (e) {
            return null;
        }
    }
    async deleteNotAvailableProducts() {
        try {
            return await deleteSome(dataBaseName, collectionName, {"count": {"$lte": 0}});
        } catch (e) {
            return null;
        }
    }
}

module.exports = {
    ProductService
}