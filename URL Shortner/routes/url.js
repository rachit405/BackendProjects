const express = require("express");
//const {handleGenerateNewUrl} = require("../controllers/url");
const {handleGenerateNewShortURL} = require("../controllers/url")
const router1 =  express.Router();

router1.post("/",handleGenerateNewShortURL);

module.exports = router1;