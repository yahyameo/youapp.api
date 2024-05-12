import { HttpStatus } from "@nestjs/common";
import { YouAppException } from "./exception";

export class UserAlreadyFoundException extends YouAppException {
    getName(): string {
        return 'user already exist';
    }
    getCode(): number {
        return HttpStatus.CONFLICT;
    }
}
