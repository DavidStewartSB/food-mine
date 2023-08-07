import { FoodSchema } from './../foods/Food.model';
import {model, Schema, Types }  from 'mongoose'
import { Food } from '../foods/Food.model'
import { OrderStatus } from '../../constants/order_status';

export interface LatLng {
    lat: string
    lng: string
}

export const LatLgnSchema = new Schema<LatLng>(
    {
        lat: {type: String, required: true},
        lng: {type: String, required: true}
    }
)

export interface OrderItem {
    food: Food
    price: number
    quantity: number
}

export const OrderItemSchema = new Schema<OrderItem> (
    {
        food: {type: FoodSchema, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true}
    }
)

export interface Order {
    name: string
    items: OrderItem[]
    totalPrice: number
    address: string
    addressLatLng: LatLng
    paymentId: string
    createdAt: Date
    status: OrderStatus
    user: Types.ObjectId //"Relaciona"
    updatedAt: Date
}

const orderSchema = new Schema<Order> (
    {
        name: {type: String, required: true},
        address: {type: String, required: true},
        items: {type: [OrderItemSchema], required: true},
        addressLatLng: {type: LatLgnSchema, required: true},
        paymentId: {type: String},
        totalPrice: {type: Number, required: true},
        status: {type: String, default: OrderStatus.NEW},
        user: {type: Schema.Types.ObjectId, required: true}

    }, {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
)

export const OrderModel = model('order', orderSchema)