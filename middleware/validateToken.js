import jwt from 'jsonwebtoken'

const validateToken = async(req, res,next)=>{
    try {
        let token;
        const authHeader = req.headers['authorization'];
        if(authHeader && authHeader.startsWith("Bearer")){
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.SECRET_KEY , (err, decoded)=>{
                if(err){
                    res.status(401)
                    throw new Error("User not authorised");
                }
                req.user = decoded.user
                next()
            })
            if(!token){
                res.status(401)
                throw new Error("User not authorised")
            }
        }
        if(!token){
            res.status(401)
            throw new Error("User not authorised")
        }
    } 
    catch (error) {
        next(error)
    }
}

export default validateToken;