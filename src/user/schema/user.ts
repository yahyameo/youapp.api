import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';
import mongoose, {Types, HydratedDocument, ObjectId, } from 'mongoose';
import { BaseMongooseDocument } from '../../schema/base-mongoose-document.model';

export type UserDocument = User & Document;

@Schema()
export class User extends BaseMongooseDocument {

  @Expose()
  @Transform((params) => params.obj._id.toString())
  _id: ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop()
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  joiningDate: Date;

  @Prop()
  birthday: Date;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  gender: string;

  @Prop()
  width: number;

  @Prop()
  height: number;

  @Prop()
  lastLoginTime: Date;

  @Prop()
  picture: string;

  @Prop()
  interests:string[]

  @Prop({ required: true })
  password: string;


}

export const UserSchema = SchemaFactory.createForClass(User);