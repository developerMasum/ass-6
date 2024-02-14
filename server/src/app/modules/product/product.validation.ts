import { z } from 'zod';

const createProductValidation = z.object({
  body: z.object({
    productName: z.string(),
    productPrice: z.number(),
    productQuantity: z.number(),
    releaseDate: z.string(),
    screenSize: z.string(),
    storageCapacity: z.string(),
    operatingSystem: z.string(),
    model: z.string(),
    brand: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});
const updateProductValidation = z.object({
  body: z.object({
    productName: z.string().optional(),
    productPrice: z.number().optional(),
    productQuantity: z.number().optional(),
    releaseDate: z.string().optional(),
    screenSize: z.string().optional(),
    storageCapacity: z.string().optional(),
    operatingSystem: z.string().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ProductValidation = {
  createProductValidation,
  updateProductValidation,
};
