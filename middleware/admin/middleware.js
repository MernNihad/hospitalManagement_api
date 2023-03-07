var jwt = require('jsonwebtoken')

function middleware(req,res,next) {
    console.log('tocken',req.headers.authorization);
    // let response = {}
    //    jwt.verify(req.headers.authorization,'adr',(err,decoded)=>{
    //         if (err) {
    //             console.log('err');
    //             console.log(err);
    //             response.message = 'Error' || err
    //             response.error = true
    //             res.json({ response });
    //             // res.json({message:'Error' || err,error:true})
    //         }else{
    //             console.log('true');
    //             next()
    //         }
    //     })
}

module.exports = middleware