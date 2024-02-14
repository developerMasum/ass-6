import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { TSell } from "./sell.interface";
import { Sells } from "./sell.model";
import { startOfDay, endOfDay, subDays, subMonths, subYears } from 'date-fns';


const createSellIntoDB = async (payload: TSell) => {
  const { productId, productQuantity } = payload;
  console.log('payload', payload);

  const productData = await Product.findById(productId);

  if (!productData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // Check if the product quantity is sufficient
  if (productData.productQuantity < productQuantity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Stock not available');
  }

  // Update the product quantity by decreasing it
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      $inc: { productQuantity: -productQuantity },
    },
    { new: true }
  );

  // Log the updated product data
  console.log('Updated Product:', updatedProduct);

  // Check if the product quantity becomes zero and delete the product
  if (updatedProduct?.productQuantity && updatedProduct.productQuantity <= 0) {
    await Product.findByIdAndDelete(productId);
    console.log('Product deleted:', productId);
  }

  const result = await Sells.create(payload);

  return result;
};

    const getAllFromDB = async (category?: string) => {
      if (category && category !== 'all') {
        const currentDate = new Date();
        let startDate;
        let endDate;
    
        switch (category) {
          case 'weekly':
            startDate = startOfDay(subDays(currentDate, 6)); // last 7 days
            endDate = endOfDay(currentDate);
            break;
          case 'daily':
            startDate = startOfDay(currentDate);
            endDate = endOfDay(currentDate);
            break;
          case 'monthly':
            startDate = startOfDay(subMonths(currentDate, 1)); // last 30 days
            endDate = endOfDay(currentDate);
            break;
          case 'yearly':
            startDate = startOfDay(subYears(currentDate, 1)); // last 365 days
            endDate = endOfDay(currentDate);
            break;
          default:
            break;
        }
    
        return await Sells.find({
          sellingDate: {
            $gte: startDate?.toISOString(),
            $lte: endDate?.toISOString(),
          },
        });
      }
    
      // If category is 'all' or not provided, fetch all sales without time-based filtering
      return await Sells.find();
    };

    export const SellServices = {
      createSellIntoDB, getAllFromDB
    };