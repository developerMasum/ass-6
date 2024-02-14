import express from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middleware/validateRequest';
import { ProductValidation } from './product.validation';

const router = express.Router();
router.post(
  '/add-product',
  validateRequest(ProductValidation.createProductValidation),

  ProductController.createProduct,
);
router.get('/products', ProductController.getAllProducts);
router.put(
  '/product/:productId',
  validateRequest(ProductValidation.updateProductValidation),
  ProductController.updateProduct,
);

router.delete('/product/:productId', ProductController.deleteProduct);

router.get('/product/:productId', ProductController.singleProduct);

export const ProductRoute = router;
