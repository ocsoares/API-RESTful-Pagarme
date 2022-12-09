import { StatusCodes } from "http-status-codes";
import { BadRequestErrorMessages, UnauthorizedErrorMessages } from "../@types/errorAPIMessages";

export class ErrorAPIHelper extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
    }
}

export class BadRequestAPIError extends ErrorAPIHelper {
    constructor(message: BadRequestErrorMessages) {
        super(message, StatusCodes.BAD_REQUEST);

        this.name = 'Bad Request';
    }
}

export class UnauthorizedAPIError extends ErrorAPIHelper {
    constructor(message: UnauthorizedErrorMessages) {
        super(message, StatusCodes.UNAUTHORIZED);

        this.name = 'Unauthorized';
    }
}