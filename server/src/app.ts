import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import notFound from './app/middlewares/notFoundRoute';


import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandling';
const app: Application = express();

//parser
app.use(express.json());

app.use(cookieParser());
app.use(cors({origin:'http://localhost:5173',credentials:true}))


app.use('/api', router);
app.get('/', (req: Request, res: Response) => {


  res.send('sport management running');
});


app.use(globalErrorHandler);
// app.use(notFound)

export default app;