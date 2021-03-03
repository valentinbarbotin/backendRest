const jwt = require('jsonwebtoken');
const environment = require("../config/environment");

module.exports = (req, res, next) => {
    try {
        // console.log("Exemple middleware")
        
        if (!req.headers.authorization) {
            return res.status(403).json({ error: 'Authorization missing' });
        } else {
            console.log("Token =",req.token);

            jwt.verify(req.token, environment.secret, function(err, decoded) {
                if (err) {
                    return res.status(403).json({ error: 'Authorization error' });
                } else {
                    console.log('Payload du token: ', decoded)
                    next();
                }
              })
        }

    } catch (error) {
        console.log(error.message)
    }
}