import { Schema, Types, model } from "mongoose";

export interface Food {
    id: string
    name: string
    cookTime: string
    price: number
    favorite: false
    origins: string[]
    stars: number
    imageUrl: string
    tags: string[]
}

export const FoodSchema = new Schema<Food>(
    {
        name: {type: String, required: true}, 
        cookTime: {type: String, required: true}, 
        price: {type: Number, required: true}, 
        favorite: {type: Boolean, default: false}, 
        origins: {type: [String], required: true}, 
        stars: {type: Number, required: true}, 
        imageUrl: {type: String, required: true}, 
        tags: {type: [String], required: true}, 
    }, {
        toJSON: {
            virtuals: true,
        },
        timestamps: true
    }
)
FoodSchema.virtual('id').get(function(){
    return this._id.toHexString();
})
FoodSchema.set('toJSON', {
    virtuals: true
})
export const FoodModel = model<Food>('Food', FoodSchema)