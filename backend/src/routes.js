import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import AvatarController from './app/controllers/AvatarController';
import SenderController from './app/controllers/SenderController';
import DeliveryController from './app/controllers/DeliveryController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (_, res) => res.send({ message: 'Welcome to FastFeet!' }));

// Add avatar image to sender
routes.post('/avatar/:id/', upload.single('file'), AvatarController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipient', RecipientController.index);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.destroy);

routes.get('/sender', SenderController.index);
routes.post('/sender', SenderController.store);
routes.put('/sender', SenderController.update);
routes.delete('/sender/:id', SenderController.destroy);

routes.post('/delivery', DeliveryController.store);
routes.get('/delivery', DeliveryController.index);
routes.put('/delivery', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.destroy);

export default routes;
