import { Products } from "../interfaces/Products";
import { model , Schema } from "mongoose";


const productsSchema: Schema = new Schema<Products>({
    name: {type: String, required: true, trim: true},
    category: {type: Schema.Types.ObjectId, required: true, ref: 'categories'},
    subcategory: {type: Schema.Types.ObjectId, required: true, ref: 'subcategory'},
    description: {type: String, required: true, trim: true, maxlength:500, minlength:15},
    price: {type: Number, required:true, min: 1, max: 1000000},
    priceAfterDisc: {type: Number, min: 1, max: 1000000},
    quantity: {type: Number, default: 0, min: 0},
    sold: {type: Number, default: 0, min: 0},
    cover: {type: String},
    images: {type: [String]},
    ratingAvg: {type: Number},
    ratingCount: {type:Number, default:0, min:0}

},{timestamps:true,toJSON: { virtuals: true }, toObject: { virtuals: true } });

productsSchema.virtual('reviews', { ref: 'reviews', foreignField: 'product', localField: '_id' })

productsSchema.pre<Products>(/^find/, function (next) {
    this.populate({ path: 'category', select: 'name -_id' })
    this.populate({ path: 'subcategory', select: 'name' })
    next()
  
  })


  export default model<Products>('products',productsSchema)
// const imageURL = (document: Products) => {
//     if (document.cover) {
//       const imageUrl: string = `${process.env.BASE_URL}/products/${document.cover}`;
//       document.cover = imageUrl;
//     }
//     if (document.images) {
//       const imageList: string[] = [];
//       document.images.forEach(image => {
//         const imageUrl: string = `${process.env.BASE_URL}/products/${image}`
//         imageList.push(imageUrl);
//       });
//       document.images = imageList;
//     }
//   }
  
  // productsSchema
  //   .post('init', (document: Products) => { imageURL(document) })
  //   .post('save', (document: Products) => { imageURL(document) })



