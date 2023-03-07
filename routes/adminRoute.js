const express = require("express");
const middleware = require("../middleware/middleware");
// const db = require("../mongodb/connection");
const adminHelper = require("../mongodb/mongoHelper/adminMongo");
const middleware_admin = require('../middleware/admin/middleware')
const jwt = require("jsonwebtoken");
const { append } = require("express/lib/response");
// const userRoute = require('../routes/userRoute')
var adminRoute = express.Router();


// adminRoute.use(middleware_admin)

adminRoute.get("/home",middleware_admin, (req, res) => {
  console.log('admin home page');
  res.json({title:'home page admin'})
  // console.log("log for slash");
});

adminRoute.post("/login", (req, res, next) => {
  if(req.body.email&&req.body.password){
  adminHelper.Login(req.body).then((response)=>{
    if(response.error){
      next(response.message)
    }else{
      if(response.login){
      const { email, password } = response.userData;
        let user = {
          email,
          password,
        };
        const accessToken = jwt.sign(user, "adr", { expiresIn: '1 days' });
        response.tokenAuth = accessToken;
        res.json(response);
    }
    }
    // console.log(response.error,'resposne');
    
  }).catch((err)=>{
    let response = {}
    response.message = 'Error'
    response.error = true
    next('Error')
  })
  // res.json({ title: "home page" });
  console.log(req.body)
  console.log(req.headers.authorization);
  console.log('log for home')

}else{
  next('email or password is null')
}




});



module.exports = adminRoute;
