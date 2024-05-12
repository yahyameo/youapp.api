import { StatusCode } from '../enum/error.enum';
import { CommonErrorName } from '../enum/error-name.enum';
import { YouAppException } from './exception';

export class ResourceNotFoundException extends YouAppException {
    getCode(): number {
        return StatusCode.ResourceNotFound;
    }

    getName(): string {
        return CommonErrorName.ResourceNotFound;
    }
}
