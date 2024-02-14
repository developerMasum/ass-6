// import { Model } from 'mongoose';

import { Model } from "mongoose";

export type TProduct = {
  productName: string;
  productPrice: number;
  productQuantity: number;
  releaseDate: string;
  screenSize:string;
  storageCapacity:string;
  operatingSystem:string
  model:string
  brand:string
  isDeleted: boolean;
};

export interface ProductModel extends Model<TProduct> {
  isProductExists(productName: string): Promise<TProduct | null>;
}
