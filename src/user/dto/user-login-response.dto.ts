import { User } from '../schema/user';
import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginResponseDto extends UserDto {
    @ApiProperty()
    token: string;

    constructor(user: User, token?: string) {
        super(user);
        this.token = token;
        this.email = user.email;
        this.username = user.username;
        this.userId = user._id.toString();
    }
}
