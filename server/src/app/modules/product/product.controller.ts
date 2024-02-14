import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from 'express';
import { ProductServices } from './product.service';



const getAllProducts: RequestHandler = catchAsync(async (req, res) => {
  const { searchTerm, model, brand, screenSize, storageCapacity, operatingSystem, releaseDate } = req.query;
  const filterOptions = {
    model: model?.toString(),
    brand: brand?.toString(),
    screenSize: screenSize?.toString(),
    storageCapacity: storageCapacity?.toString(),
    operatingSystem: operatingSystem?.toString(),
    releaseDate: releaseDate ? new Date(releaseDate.toString()) : undefined,
  };

  const result = await ProductServices.getAllProducts(searchTerm?.toString(), filterOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Products are retrieved successfully',
    data: result,
  });
});




const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});


const updateProduct: RequestHandler = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const product = req.body;

  const result = await ProductServices.updateProduct(productId, product);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});
const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteProductFromDB(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product  deleted successfully',
    data: result,
  });
});
const singleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product  deleted successfully',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  singleProduct
};
