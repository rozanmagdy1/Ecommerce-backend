const {ObjectId} = require("mongodb");
const jwt = require("jsonwebtoken");
const {findOne} = require("../DB/Base");
const dataBaseName = "ZobaStore";
const collectionName = "users";
async function WebsiteMiddleWare(req, res, next) {

    if(req.path == '/login' || req.path == '/register'|| req.path == '/products' || req.path == '/sale/products'||
        req.path == '/available/products' ||  req.path == '/generalCategories' || req.path == '/categories'
        || req.path == '/forgotPassword'|| req.path == '/resetPassword'){
        next();
    }else {
        try {
            let token = req.headers["authorization"];
            if(!token){
                return res.status(401).json({message: "unauthorized"})
            }else{
                let decoded = jwt.verify(token, 'shhhhh');
                req.user = await findOne(dataBaseName, collectionName, {"_id": ObjectId(decoded.id)});
                next();
            }
        }catch (e) {
            res.json({
                message : "invalid token"
            })
        }
    }
}
module.exports = {
    WebsiteMiddleWare
}