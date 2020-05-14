const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token')

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' }) //  401 -> unauthorized
    }
    try {
        const decoded = jwt.verify(token, 'webinar-secret-token')
        req.user = decoded.user
        next()
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}