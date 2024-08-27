import { Products } from "../interfaces/Products";
import { model , Schema } from "mongoose";


const productsSchema: Schema = new Schema<Products>({
    name: {type: String, required: true, trim: true, unique: true},
    category: {type: Schema.Types.ObjectId, required: true, ref: 'categories'},
    Subcategory: {type: Schema.Types.ObjectId, required: true, ref: 'subcategory'},
    description: {type: String, required: true, trim: true, maxlength:500, minlength:15},
    price: {type: Number, required:true, min: 1, max: 1000000},
    priceAfterDisc: {type: Number, min: 1, max: 1000000},
    quantity: {type: Number, default: 0, min: 0},
    sold: {type: Number, default: 0, min: 0},
    cover: {type: String},
    images: {type: [String]},
    ratingAvg: {type: Number, default: 0, min: 0, max: 5},
    ratingCount: {type:Number, default:0, min:0}

},{timestamps:true});


productsSchema.pre<Products>(/^find/, function (next) {
    this.populate({ path: 'category', select: 'name -_id' })
    this.populate({ path: 'subcategory', select: 'name' })
    next()
  })

  export default model<Products>('products',productsSchema)
