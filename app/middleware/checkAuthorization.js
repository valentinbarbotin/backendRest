module.exports = (req, res, next) => {
    try {
        console.log("Exemple middleware")
        
        if (!req.headers.authorization) {
            return res.status(403).json({ error: 'Authorization missing' });
        } else {
            console.log("Token =",req.token)
            if (req.token != "123") {
                return res.status(403).json({ error: 'Authorization error' });
            } else {
                next();
            }
        }

    } catch (error) {
        console.log(error.message)
    }
}