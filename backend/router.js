const express = require("express");

const router = express.Router();

const jwt = require("jsonwebtoken");

const db = require("./database/connect");

router.get("/", (req, res) => {
  res.send("hello");
});

router.get("/verify/:token", async (req, res) => {
  try {
    let token = req.params["token"];
    const result = await jwt.verify(token, process.env.secretkey);
    if (result) {
        const data = await db.users.create({
            username:result.username,
            email:result.email,
            password:result.password
        });
        return res.redirect(process.env.clienturl);
    } else {
      return res.status(400).send("error");
    }
  } catch(error) {
    return res.status(400).send("error");
  }
});

router.post("/signup", (req, res) => {
  return require("./Controllers/register").register(req, res, db);
});

router.post("/signin", (req, res) => {
    return require("./Controllers/signin").signin(req,res,db);
});

router.post("/googlelogin", (req,res) => {
    return require("./Controllers/signin").googlesignin(req,res,db);
});

router.post("/getposts",(req,res)=>{
  return require("./Controllers/posts").getposts(req,res,db);
})

router.post("/addposts",(req,res)=>{
  return require("./Controllers/posts").addposts(req,res,db);
})


module.exports = router;