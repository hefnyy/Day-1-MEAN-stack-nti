import {Schema,model} from "mongoose";
import { Subcategory } from "../interfaces/subcategory";



const subCategorySchema: Schema = new Schema<Subcategory>({
    name: {type: String, required: true, trim: true, unique: false},
    category: {type: Schema.Types.ObjectId, required: true,ref: 'categories'}
},{timestamps:true});


subCategorySchema.pre<Subcategory>(/^find/, function (next) {
    this.populate({ path: 'category', select: 'name -_id' })
    next()
  })

export default model<Subcategory>('subcategory',subCategorySchema)