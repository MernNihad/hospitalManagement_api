const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if (authHeader) {

        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'your-secret-key', (err, user) => {
            if (err) {
                next(err.message || 'error occurs.');
            } else {
                next();
            }
        });

    } else {
        next('auth is null')
    }
}
module.exports = authentication