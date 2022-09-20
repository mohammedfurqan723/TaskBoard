const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
    try{
        const accessToken = req.header('Authorization');

        if(!accessToken) return res.status(400).json({msg:"Invalid Authentication."});

        jwt.verify(accessToken, process.env.SECERT_ACCESS_TOKEN, (err, user) => {

            if(err) return res.status(400).json({msg:"Invalid Authentication."})

            req.user = user;

            next();
        })

    }
    catch(err){
        console.log(err);
    }
};

module.exports = userAuth;