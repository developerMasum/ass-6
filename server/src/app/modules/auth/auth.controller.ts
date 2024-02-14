import httpStatus from 'http-status';

import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import config from '../../config/config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
    },
  });
});
const refreshToken = catchAsync(async (req, res) => {
      const { refreshToken } = req.cookies;
      console.log('token',refreshToken)
      const result = await AuthServices.refreshToken(refreshToken);
    
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Refresh token is retrieved successfully!',
        data: result,
      });
    });

export const AuthControllers = {
  loginUser,
  refreshToken
};