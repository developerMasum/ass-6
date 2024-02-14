import { ProductModel, TProduct } from './product.interface';
import { Schema, model } from 'mongoose';

const ProductSchema = new Schema<TProduct, ProductModel>(
  {
    productName: {
      type: String,
      required: [true, 'productName is required'],
    },
    productPrice: {
      type: Number,
      required: [true, 'productPrice is required'],
    },
    productQuantity: {
      type: Number,
      required: [true, 'productQuantity is required'],
    },
    releaseDate: {
      type: String,
      required: [true, 'releaseDate is required'],
    },
    screenSize: {
      type: String,
      required: [true, 'screenSize is required'],
    },
    storageCapacity: {
      type: String,
      required: [true, 'storageCapacity is required'],
    },
    operatingSystem: {
      type: String,
      required: [true, 'operatingSystem is required'],
    },
    model: {
      type: String,
      required: [true, 'model is required'],
    },
    brand: {
      type: String,
      required: [true, 'brand is required'],
    },

    isDeleted: { type: Boolean, default: false, select: 0 },
  },
  {
    timestamps: true,
  },
);

// generating full name

// filter out deleted documents
ProductSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ProductSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ProductSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//checking if user is already exist!
ProductSchema.statics.isUserExists = async function (productName: string) {
  const existingProduct = await Product.findOne({ productName });
  return existingProduct;
};

export const Product = model<TProduct, ProductModel>('Product', ProductSchema);
