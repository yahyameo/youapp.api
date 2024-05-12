import mongoose, { Document, ObjectId } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export abstract class BaseMongooseDocument extends Document {

    @Prop()
    createdBy: string;

    @Prop({default:new Date()})
    createdAt: Date;

    @Prop()
    deletedAt: Date;

    @Prop()
    updatedAt: Date;
  
    @Prop({default:true})
    isActive: boolean;
  
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Companies"})
    company: ObjectId;
}
