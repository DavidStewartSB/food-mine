import {  Schema, model } from "mongoose";

export interface User {
    id?: string,
    name: string,
    email: string,
    password: string,
    address: string,
    isAdmin: boolean,
    imageUrl: string
}

export const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    imageUrl: {type: String, required: false}
},  {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }

}

)
UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
UserSchema.set('toJSON', {
    virtuals: true
})

export const UserModel = model<User>('users', UserSchema)