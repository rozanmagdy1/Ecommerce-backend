const mongo = require('mongodb');
const {ObjectId} = require("mongodb");
const MongoClient = mongo.MongoClient;
let url = process.env.MONGO_URI

//connect to mongo data base
function MongoConnect(url) {
    return new Promise(function (resolve, reject){
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },function(err, db) {
            if (err) {reject(err)}
            resolve(db);
        });

    })
}
//create collection
function createCollection(databaseName , collectionName) {
    return new Promise(function (resolve, reject) {
        MongoConnect(url).then((db)=>{
            console.log("Connect done");
            const dbo = db.db(databaseName);
            dbo.createCollection(collectionName, function(err, result) {
                if (err){reject(err)}
                resolve({result,db});
                db.close();
            });

        })
    })
}
//insert one row
function insertOne(databaseName,collectionName,data) {
    return new Promise(function (resolve, reject) {
        MongoConnect(url).then((db) => {
            console.log("Connect done");
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).insertOne(data, function (error, result) {
                if (error) {reject(error)}
                console.log("one document inserted");
                resolve(result);
                db.close();
            })
        })
    })
}
//insert multiple row
function insertMany(databaseName,collectionName,data){
    return new Promise(function (resolve, reject) {
        MongoConnect(url).then((db) =>{
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).insertMany(data , (error, result) => {
                if (error) {reject(error)}
                console.log("Number of documents inserted: " + result.insertedCount);
                resolve(result);
                db.close();
            })
        })
    })
}
//Query operation find() for all documents
function findAll(databaseName,collectionName,filter = {}){
    return new Promise((resolve,reject) =>{
        MongoConnect(url).then((db) => {
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).find(filter).toArray(function (error, result) {
                if (error) {reject(error)}
                resolve(result);
                db.close();
            })
        })
    })
}
//Query operation findOne() for one document
function findOne(databaseName,collectionName,filter = {}){
    return new Promise((resolve,reject) =>{
        MongoConnect(url).then((db) => {
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).findOne(filter,function (error, result) {
                if (error) {reject(error)}
                resolve(result);
                db.close();
            })
        })
    })
}
//sort documents
function sortDocuments(databaseName,collectionName,sort = {}) {
    return new Promise((resolve, reject) =>{
        MongoConnect(url).then((db)=>{
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).sort(sort).toArray(function (error, result) {
                if(error){reject(error)}
                resolve(result);
                db.close();
            })
        })
    })
}
//update one document by id
function updateOne(databaseName,collectionName,id, newValues = {}) {
    return new Promise((resolve, reject) =>{
        MongoConnect(url).then((db)=>{
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).updateOne({"_id" : ObjectId(id)},{$set : newValues},
                function (error, result) {
                    if(error){reject(error)}
                    resolve(result);
                    db.close();
                })
        })
    })
}
//update one document by any query
function updateOneByQuery(databaseName,collectionName,query, newValues = {}) {
    return new Promise((resolve, reject) =>{
        MongoConnect(url).then((db)=>{
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).updateOne(query,{$set : newValues},
                function (error, result) {
                    if(error){reject(error)}
                    resolve(result);
                    db.close();
                })
        })
    })
}
//update all documents by query
function updateAll(databaseName,collectionName,newValues) {
    return new Promise((resolve, reject) =>{
        MongoConnect(url).then((db)=>{
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).updateMany({},{$set : newValues},
                function (error, result) {
                    if(error){reject(error)}
                    resolve(result);
                    db.close();
                })
        })
    })
}
//delete document
function deleteOne(databaseName,collectionName,filter ={}) {
    return new Promise((resolve, reject)=>{
        MongoConnect(url).then((db)=>{
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).deleteOne(filter,function (error, result) {
                if(error){reject(error)}
                resolve(result);
                db.close();
            })
        })
    })
}
//delete all documents
function deleteAll(databaseName,collectionName) {
    return new Promise((resolve, reject)=>{
        MongoConnect(url).then((db)=>{
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).deleteMany({},function (error,result) {
                if(error){reject(error)}
                resolve(result);
                db.close();
            })
        })
    })
}
//delete some documents
function deleteSome(databaseName,collectionName,filter = {}) {
    return new Promise((resolve, reject)=>{
        MongoConnect(url).then((db)=>{
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).deleteMany(filter,function (error,result) {
                if(error){reject(error)}
                resolve(result);
                db.close();
            })
        })
    })
}
//drop collection
function dropCollection(databaseName,collectionName) {
    return new Promise((resolve, reject)=>{
        MongoConnect(url).then((db)=>{
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).drop( (error, result)=>{
                if(error) {reject(error)}
                console.log("collection deleted");
                resolve(result);
            })
        })
    })
}
//view only first n documents
function findFirstNDocuments(databaseName,collectionName,n){
    return new Promise((resolve,reject) =>{
        MongoConnect(url).then((db) => {
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).find().limit(n).toArray(function (error, result) {
                if (error) {reject(error)}
                resolve(result);
                db.close();
            })
        })
    })
}
//view all documents except first n documents
function skipFirstNDocuments(databaseName,collectionName,n){
    return new Promise((resolve,reject) =>{
        MongoConnect(url).then((db) => {
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).find().skip(n).toArray(function (error, result) {
                if (error) {reject(error)}
                resolve(result);
                db.close();
            })
        })
    })
}
//update some documents
function updateSome(databaseName,collectionName,filter = {}, newValues) {
    return new Promise((resolve, reject)=>{
        MongoConnect(url).then((db)=>{
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).updateMany(filter, {$set : newValues},
                function (error,result) {
                    if(error){reject(error)}
                    resolve(result);
                    db.close();
                })
        })
    })
}
//update one document by ObjectId
function updateOneByObjectId(databaseName,collectionName,id, newData) {
    return new Promise((resolve, reject)=>{
        MongoConnect(url).then((db)=>{
            const dbo = db.db(databaseName);
            dbo.collection(collectionName).updateOne({"_id" : ObjectId(id)},{$set : newData}
                ,function (error,result) {
                    if(error){reject(error)}
                    resolve(result);
                    db.close();
                })
        })
    })
}
module.exports = {
    MongoConnect,
    dropCollection,
    findFirstNDocuments,
    skipFirstNDocuments,
    sortDocuments,
    createCollection,
    insertOne,
    insertMany,
    findAll,
    findOne,
    updateOne,
    updateAll,
    updateOneByQuery,
    deleteOne,
    deleteAll,
    deleteSome
}