const router = require('express').Router();
const middleware=require("./middlewares")
const authController=require('./controllers/auth.controller')
const genericController=require("./controllers/generic.controller")

router.get('/ping',genericController.handler)

router.post('/auth/signup',authController.signUp)
router.post("/auth/login", authController.login);

router.get("/user/detail",middleware.checkUser,genericController.userDetail)


module.exports=router