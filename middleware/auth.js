import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send("Unauthorized: Missing token");

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(403).send("Unauthorized: Invalid token");
        req.user = decoded;
        next();
    });
}
