import { StatusCode } from '../enum/error.enum';
import { CommonErrorName } from '../enum/error-name.enum';
import { YouAppException } from './exception';

export class ChangePasswordException extends YouAppException {
    getCode(): number {
        return StatusCode.CurrentPasswordNotMatch;
    }

    getName(): string {
        return CommonErrorName.CurrentPasswordNotMatch;
    }
}
