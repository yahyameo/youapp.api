import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/user';

@Module({
    imports:[
        MongooseModule.forRoot('mongodb://localhost/youapp'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
