const {findAll, findOne, insertOne, updateOne, deleteOne, deleteAll} = require("../DB/Base");
const {ObjectId} = require("mongodb");
const dataBaseName = "ZobaStore";
const collectionName = "generalCategories";

class GeneralCategoryService {
    async listGeneralCategories() {return await findAll(dataBaseName,collectionName);}
    async listGeneralCategoryById(id) {
        try {
            return await findOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        }catch(e) {
            return null;
        }
    }
    async createGeneralCategory(data) {
        try {
            data.isActive = true;
            return await insertOne(dataBaseName,collectionName,data);
        }catch (e) {
            return null;
        }
    }
    async updateGeneralCategory(id, data) {
        let generalCategory = await findOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        if(!generalCategory){
            return null
        }else{
            return await updateOne(dataBaseName,collectionName,id,data);
        }
    }
    async deleteGeneralCategory(id) {
        let generalCategory = await findOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        if(!generalCategory){
            return null
        }else{
            return await deleteOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        }
    }
    async deleteAllGeneralCategories() {
        try {
            return await deleteAll(dataBaseName,collectionName);
        }catch (e) {
            return null;
        }
    }
    async changeGeneralCategoryStatus(id) {
        let generalCategory = await findOne(dataBaseName,collectionName,{_id : ObjectId(id)});
        if(!generalCategory){
            return null
        }else{
            if(!generalCategory.isActive || generalCategory.isActive === false){
                return await updateOne(dataBaseName,collectionName,id,{isActive : true});
            }else{
                return await updateOne(dataBaseName,collectionName,id,{isActive : false});
            }
        }
    }
}

module.exports = {
    GeneralCategoryService
}