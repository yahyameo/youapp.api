import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionErrorType } from '../enum/exception-error.enum';
import { STATUS_CODES } from 'http';

export abstract class BaseException extends HttpException {
    constructor(message?: string) {
        super(message, HttpStatus.OK);
    }

    /**
     * @deprecated will cease after make sure no app is consuming this
     */
    abstract getCode(): number;

    abstract getType(): ExceptionErrorType;

    abstract getName(): string;

    getNamespace(): string {
        return '';
    }

    getResponse(): object {
        return {
            success: false,
            data: null,
            message: `${this.getName()}`,
            statusCode: this.getCode()
        };
    }
}
