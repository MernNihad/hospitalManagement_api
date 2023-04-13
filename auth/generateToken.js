const jwt = require('jsonwebtoken');

const generateToken = (data) => token = jwt.sign(data, 'your-secret-key', { expiresIn: '2h' })

module.exports = { generateToken }