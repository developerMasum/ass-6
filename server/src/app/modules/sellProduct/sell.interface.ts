import { Types } from "mongoose";

export type TSell={
      productName:string;
      buyerName:string;
      sellingDate:string;
      productPrice:number
      productQuantity:number;
      productId:Types.ObjectId

}