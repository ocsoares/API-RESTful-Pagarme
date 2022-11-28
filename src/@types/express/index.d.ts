declare namespace Express {
    import { JwtPayload } from "jsonwebtoken";
    interface Request {
        errorStatus: number;
        JWT: object;
    }
}