import { Schema, model } from 'mongoose';
import { TSell } from './sell.interface';

const sellsSchema = new Schema<TSell>(
  {
    productName: { type: String, required: [true, 'product name is required'] },
    
    productQuantity: {
      type: Number,
      required: [true, 'product quantity name is required'],
    },
    
    productPrice: {
      type: Number,
      required: [true, 'product quantity name is required'],
    },
    sellingDate:{
      type:String
    },
    buyerName:{
      type:String,
      required:true
    },
   productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
     
    },
  },
  { timestamps: true },
);




export const Sells = model<TSell>('Sell', sellsSchema);