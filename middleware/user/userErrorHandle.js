function errorHandler(err, req, res, next) {
//   console.log(err.stack);
//   console.log(err.length);
// err = err || 'some error occurs,please try again'
if (err.length==undefined) {
    res.json({message:'some error occurs,please try again'})
}else{
   res.json({message:err})
}

}

module.exports = errorHandler