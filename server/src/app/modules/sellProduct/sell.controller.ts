import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SellServices } from './sell.service';
import { RequestHandler } from 'express';

const createSell = catchAsync(async (req, res) => {
  const result = await SellServices.createSellIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'sell created successfully',
    data: result,
  });
});

const getAllSell: RequestHandler = catchAsync(async (req, res) => {
  const { category } = req.query;

  let result;

  if (category) {
    result = await SellServices.getAllFromDB(category.toString());
  } else {
    result = await SellServices.getAllFromDB();
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales history retrieved successfully',
    data: result,
  });
});

export const SellControllers = {
  createSell,
  getAllSell,
};
