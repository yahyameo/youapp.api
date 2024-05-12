import { StatusCode } from '../enum/error.enum';
import { CommonErrorName } from '../enum/error-name.enum';
import { YouAppException } from './exception';

export class NotAuthorisedException extends YouAppException {
    getCode(): number {
        return StatusCode.NotAuthorised;
    }

    getName(): string {
        return CommonErrorName.NotAuthorised;
    }
}
