const e = require("cors");
const jwt = require("jsonwebtoken");
const jwtSecret = "secret-123";

const ensureauthenticated = (req, res, next) => {
    const autheader = req.headers['authorization'];

    if (!autheader) {
        res.status(403).json({ message: 'Unauthrozired, JWT token not found' });
    }

    try {
        const decoded = jwt.verify(autheader, jwtSecret);
        req.user = decoded;
        next();

    }
    catch (error) {
        res.status(403).json({ message: 'Unauthrozired, JWT token expired' });

    }


}
module.exports = ensureauthenticated;