import express from 'express';

import { SellControllers } from './sell.controller';

const router = express.Router();
router.post(
  '/create-sell',

  //   validateRequest(ProductValidation.createProductValidation),

  SellControllers.createSell,
);

router.get('/sell-products', SellControllers.getAllSell);

export const SellRoute = router;
