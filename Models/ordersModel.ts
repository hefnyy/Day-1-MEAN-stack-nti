import { Schema, model } from "mongoose";
import { Orders } from "../interfaces/orders";

const ordersSchema: Schema = new Schema<Orders>({
  cartItems: [{
    product: { type: Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number, default: 1 },
    price: Number
  }],
  totalPrice: Number,
  deliveryFees: { type: Number, default: 0 },
  deliveredAt: Date,
  isDelivered: { type: Boolean, default: false },
  paidAt: Date,
  isPaid: { type: Boolean, default: false },
  paymentMethod: { type: String, enum: ['cash', 'card'], default: 'cash' },
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  address: { type: String, required: true }
  
  }, { timestamps: true });

ordersSchema.pre<Orders>(/^find/, function (next) {
  this.populate({ path: 'cartItems.product', select: 'name cover' })
  this.populate({ path: 'user', select: 'name profileImage email' })
  next()
})

export default model<Orders>('orders', ordersSchema)