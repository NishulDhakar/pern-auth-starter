import jwt from "jsonwebtoken"
import "dotenv/config";

const SECRET = process.env.JWT_SECRET as string

export const signToken = (payload : object) => {
    return jwt.sign(payload, SECRET , {expiresIn: "7d"})
}

export const verifyToken = (token : string) => {
    return jwt.verify(token, SECRET)
}