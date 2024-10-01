import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt'

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({})
     username: string

    @Prop({ required: true, unique: true })
     email: string

    @Prop({})
     password: string

     @Prop({})
     urlImg: string
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})