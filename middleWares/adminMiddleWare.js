const {findOne} = require("../DB/Base");
const {ObjectId} = require("mongodb");
const jwt = require("jsonwebtoken");
const dataBaseName = "ZobaStore";
const collectionName = "users";
async function adminMiddleWare(req,res,next) {

    if(req.path == '/login' || req.path == '/register'|| req.path == '/products' || req.path == '/sale/products'||
        req.path == '/available/products' ||  req.path == '/generalCategories' || req.path == '/categories'
        || req.path == '/forgotPassword'|| req.path == '/resetPassword'){
        next();
    }else {
        try {
            let token = req.headers["authorization"];
            if(!token){
                return res.status(401).json({message: "unauthorized"})
            }
            let decoded = jwt.verify(token, 'shhhhh');
            let user = await findOne(dataBaseName, collectionName, {"_id": ObjectId(decoded.id)});

            if (!user || decoded.isAdmin === false) {
                return res.status(401).json({message: "unauthorized"})
            } else {
                req.user = user;
                next();
            }
        }catch (e) {
            res.json({
                message : "invalid token"
            })
        }
    }
}
module.exports ={
    adminMiddleWare
}