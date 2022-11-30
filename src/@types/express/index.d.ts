
declare namespace Express {
    import { JwtPayload } from "jsonwebtoken";
    interface Request {
        errorStatus: number;
        JWT: {
            id: string,
            username: string,
            iat: number,
            exp: number;
        };
    }
}