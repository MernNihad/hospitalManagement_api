const { JsonWebTokenError } = require('jsonwebtoken');
var jwt = require('jsonwebtoken')

function middleware(req,res,next) {
    
    if (req.headers.authorization) {
        
        let splitAfter = req.headers.authorization
        let splitAF =  splitAfter.split(' ')
        
        // console.log(req.headers.authorization);
        // console.log('midddle ware start');
        jwt.verify(splitAF[3],'scr',(err,decoded)=>{
            //    console.log(err,'err');
            //    console.log(decoded,'decoded');
            //    console.log(req.headers.authorization);
            if (err) {
                if (err instanceof JsonWebTokenError) {
                    next(err.message)
                    return
                }else{
                    next(err.message)
                }
            }else{
                next()
                console.log(decoded,'decoded');
            }
        })
    }else{
        if (req.headers.authorization === undefined) {
            next('auth null')
        }
    }


        console.log('midddle ware end');


    // if (req.headers.authorization==='1234') {
    //     next()
    // }else if(req.headers.authorization==''){
    //     res.json({err:'please login'})
    // }
    // else{
    //     res.json({err:'auth failed'})
    //     console.log('i am middleware')
    // }
}

module.exports = middleware