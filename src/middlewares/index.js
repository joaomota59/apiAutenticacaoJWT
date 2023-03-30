import * as dotenv from 'dotenv';

import jwt from 'jsonwebtoken';

dotenv.config();

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).send({ error: 'Acesso negado' });

    const secret = process.env.TOKEN_SECRET;

    jwt.verify(token, secret, (err, user) => {
        if(err) return res.status(403).send({ error: 'Acesso negado' });

        req.user = user;

        next();
    });


}

export default verifyToken;