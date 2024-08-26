import {Schema,model} from "mongoose";
import { Subcategory } from "../interfaces/subcategory";



const subCategorySchema: Schema = new Schema<Subcategory>({
    name: {type: String, required: true, trim: true, unique: true},
    category: {type: Schema.Types.ObjectId, required: true}
},{timestamps:true});

export default model<Subcategory>('subcategory',subCategorySchema)