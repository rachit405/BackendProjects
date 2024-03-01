const express = require("express");
const jwt = require("jsonwebtoken");
const secretKey = "secretKey1";

const PORT = 3000;
const app = express();

app.get('/', (req,res) => {
   return  res.json({
        message : "Hello from server"
    })
});

app.post('/login', (req,res) => {
    const user = {
        id: 1,
        userName: "abc@gmail.com",
        passWord: "abc123"
    }
    jwt.sign({user}, secretKey, {expiresIn: '3000s'}, (err, token) => {
        return res.json({
            token
        })
    })
});

app.post('/profile', ValidateToken, (req,res) => {
    jwt.verify(req.token, secretKey, (err, authData) => {
        if(err){
            res.send({ result: "invalid token"});
        }
        else{
            res.json({message : "profile validated",
            authData
        })

        }
    })
})


function ValidateToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }
    else{
        res.send({
            result: 'token is invalid'
        })
    }
}


app.listen(PORT, () => "Server started at ", PORT);