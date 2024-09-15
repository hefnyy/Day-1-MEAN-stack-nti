import { Schema, model } from "mongoose";
import { Users } from "../interfaces/users";
import bcrypt from 'bcryptjs';
// import { Address } from './../interfaces/addresses';

const usersSchema: Schema = new Schema<Users>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, maxlength: 20 },
  profileImage: String,
  role: { type: String, required: true, enum: ['manager', 'admin', 'user'], default: 'user' },
  active: { type: Boolean, default: true },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'products' }],
  // address:[String],
  phoneNumber: { type: Number, required: true },
  // address:[{type:Schema.Types.ObjectId,ref:'address'}],
  passwordUpdatedAt: Date,
  resetCode: String,
  resetCodeExpireTime: Date,
  resetCodeVerify: Boolean
}, { timestamps: true });

// const imageURL = (document:Users) => {
//   if (document.profileImage) {
//     const imageUrl: string = `${process.env.BASE_URL}/users/${document.profileImage}`;
//     document.profileImage = imageUrl;
//   }
// }

// usersSchema
//   .post('init', (document: Users) => { imageURL(document) })
// .post('save',(document: Users) => { imageURL(document) })

usersSchema.pre<Users>('save', async function (next) {
  console.log(this.isModified('password'));
  if (!this.isModified('password')) return next;
  console.log(this.isModified('password'));
  this.password = await bcrypt.hash(this.password, 13)
});

export default model<Users>('users', usersSchema)