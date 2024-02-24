const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// middleware

app.use(express.urlencoded({extended: false}));

app.use((req,res,next) => {
    console.log('hello from middleware 1');
    next();
});
// routes

app.get('/api/users', (req,res) => {
    return res.json(users);
});

/* Dynamic path paramerts
    GET /api/users/:id
    :id -> Variable / Dynamic
*/

app.get('/api/users/:id', (req,res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    if(!user) return res.status(404).json({error : 'user not found'});
    return res.json(user);
} );

app.listen(PORT, () => console.log(`server started at port${PORT}`));



