const shortId = require("shortid");
const URL = require('../models/url');


async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error : 'url is required'});

    }
         
    const shotId = nanoid(8);
    await URL.create({
        shortId : shortId,
        redirectUrl : body.url,
        visitHistory: []
    });

    return res.json({id: shotId});
}

module.exports = {
    handleGenerateNewShortURL,
};
