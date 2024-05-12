import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { NotAuthorisedException } from 'src/utils/exception/not-authorised.exception';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    validateRequest(request): boolean {
        if (!request.headers['authorization']) {
            return false;
        }

        try {
            let token = request.headers['authorization'].split(" ")[1].trim();
            const user = this.jwtService.verify(token,
                { secret: process.env.Secret }
            );
            request['user'] = user;
            return true;
        } catch (e) {
            throw new NotAuthorisedException();
        }
    }
}
