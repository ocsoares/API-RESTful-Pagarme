import { BadRequestErrorMessages } from "../@types/errorAPIMessages";

export class ErrorAPIHelper extends Error {
    public readonly statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
    }
}

// FAZER um ENUM para as Strings válidas que podem ser passadas como Parâmetro !!
export class BadRequestAPIError extends ErrorAPIHelper {
    constructor(message: BadRequestErrorMessages) {
        super(message, 400);

        this.name = 'Bad Request';
    }
}