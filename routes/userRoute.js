const express = require("express");
const middleware = require("../middleware/middleware");
const db = require("../mongodb/connection");
const mongoHelper = require("../mongodb/mongoHelper/mongoHelper");
const jwt = require("jsonwebtoken");
const errorHandler = require('../middleware/user/userErrorHandle')
// const userRoute = require('../routes/userRoute')
var userRouter = express.Router();

userRouter.get("/", (req, res,next) => {
  // res.json({title:'home page'})
  next(new Error('failed to access'))
},errorHandler);

userRouter.get("/home", middleware, (req, res, next) => {
  res.json({ title: "home page" });
});

userRouter.post("/signup", (req, res,next) => {
  const body = req.body
  if(body.name&&body.password&& body.email){
    mongoHelper.Signup(req.body).then((userData) => {
      if (userData.loggedStatus) {
        const { name, password, email } = userData.data;
        const user = { name, email, password };
        const accessToken = jwt.sign(user, "scr", { expiresIn: '1 days' });
        userData.tokenAuth = accessToken;
        res.json(userData);
      } else {
        const {message,loggedStatus} = userData
        next(message)
      }
    }).catch(err => next(err));
  }else{
      next('fields null')
  }
});

userRouter.post("/login", (req, res,next) => {
  if (req.body.email && req.body.password) {
    mongoHelper.Login(req.body).then((logData) => {
      if(logData.error){
        next(logData.message)
        return
      }else{
        const { email, name, password } = logData.userData;
        let user = { name, email, password, };
        const accessToken = jwt.sign(user, "scr", { expiresIn: '1 days' });
        logData.tokenAuth = accessToken;
        res.json(logData);
      }
    });
  } else {
    next("password or email is null")
  }
});

module.exports = userRouter;
