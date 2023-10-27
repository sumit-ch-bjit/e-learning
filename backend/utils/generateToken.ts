import jwt from 'jsonwebtoken'

const generateToken = (user: object) => {
    const jwtSecret = process.env.JWT_SECRET || "abc@123"
    return jwt.sign({ user }, jwtSecret, {
        expiresIn: "1h",
    });
};

export default generateToken;