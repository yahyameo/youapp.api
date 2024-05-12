import { BaseException } from './base.exception';
import { ExceptionErrorType } from '../enum/exception-error.enum';
import { StatusCode } from '../enum/error.enum';

export abstract class YouAppException extends BaseException {

    getType(): ExceptionErrorType {
        return ExceptionErrorType.Exception;
    }

    getCode(): number {
        return StatusCode.SomethingWentWrong;
    }
}
