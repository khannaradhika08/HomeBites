var jwt = require('jsonwebtoken');

var authenticate = (req,res,next)=>{
    try {
        var token = req.headers.authorization.split(' ')[1]
        var decode = jwt.verify(token, 'Qsd4A587(-')
        req.user = decode
        next()
    } catch (error) {
        res.json({
            message: 'Authentication Failed'
        })
        
    }
}

module.exports = authenticate