import { Router } from 'express';
import { ProductRoute } from '../modules/product/product.route';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { SellRoute } from '../modules/sellProduct/sell.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: ProductRoute,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/product',
    route: SellRoute,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
