import ErrorCode from "../constants.js"

export const errorHandler = (err,req,res,next)=>{
    const status = res.statusCode ? res.statusCode : 500
    switch(status){
        case ErrorCode.VALIDATION_ERROR:
            return res.status(status).json({title:"Validation Error", message:err.message, stackTrace: err.stack})
        case ErrorCode.NOT_FOUND:
            return res.status(status).json({title:"Not Found", message:err.message, stackTrace: err.stack})
        case ErrorCode.FORBIDDEN:
            return res.status(status).json({title:"Forbidden", message:err.message, stackTrace: err.stack})   
        case ErrorCode.UNAUTHORISED:
            return res.status(status).json({title:"UnAuthorised", message:err.message, stackTrace: err.stack})
        case ErrorCode.SERVER_ERROR:
            return res.status(status).json({title:"Server Error", message:err.message, stackTrace: err.stack})
        default:
            console.log(err)
    }
}