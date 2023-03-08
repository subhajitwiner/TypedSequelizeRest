// const jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';

module.exports = (req, res, next) =>{
    try {
        let token = req.headers.authorization.split(' ')[1];
        let decoded = jwt.verify(token,'superSecret@wwe');
        req.token = req.headers.authorization.split(' ')[1];;
        next();
        
    } catch (error) {
        return res.status(401).json({ message: 'auth faild' });
    }
}