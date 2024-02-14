import { TProduct } from './product.interface';
import { Product } from './product.model';

const getAllProducts = async (
  searchTerm: string = '',
  filterOptions: {
    model?: string;
    brand?: string;
    screenSize?: string;
    storageCapacity?: string;
    operatingSystem?: string;
    releaseDate?: Date;
    priceRange?: [number, number]; 
  } = {}
) => {
  const filter = {
    ...(searchTerm && {
      $or: [
        { model: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
      ],
    }),
    ...(filterOptions.model && { model: filterOptions.model }),
    ...(filterOptions.brand && { brand: filterOptions.brand }),
    ...(filterOptions.screenSize && { screenSize: filterOptions.screenSize }),
    ...(filterOptions.storageCapacity && { storageCapacity: filterOptions.storageCapacity }),
    ...(filterOptions.operatingSystem && { operatingSystem: filterOptions.operatingSystem }),
    ...(filterOptions.releaseDate && { releaseDate: filterOptions.releaseDate }),
    ...(filterOptions.priceRange && {
      productPrice: { $gte: filterOptions.priceRange[0], $lte: filterOptions.priceRange[1] },
     
    }),
  };

  const result = await Product.find(filter);
  console.log('resultttt',result);
  return result;
};




const createProductIntoDB = async (payload: TProduct) => {
  const data = { ...payload };
  const result = await Product.create(data);
  return result;
};

const updateProduct = async (productId: string, product: TProduct) => {
  const result = await Product.updateOne({ _id: productId }, product, {
    // new: true,
    runValidators: true,
  });

  if (result.modifiedCount > 0) {
    // Product was updated successfully
    return result; // You can return additional information if needed
  } else {
    // Product was not found or not modified
    return null;
  }
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProducts,
  updateProduct,
  deleteProductFromDB,
  getSingleProductFromDB
};
