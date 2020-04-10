import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import AvatarController from './app/controllers/AvatarController';
import FileController from './app/controllers/FileController';
import SenderController from './app/controllers/SenderController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryPendingController from './app/controllers/DeliveryPendingController';
import DeliveryDeliveredController from './app/controllers/DeliveryDeliveredController';
import DeliveryPickupController from './app/controllers/DeliveryPickupController';
import DeliveryDoneController from './app/controllers/DeliveryDoneController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (_, res) => res.send({ message: 'Welcome to FastFeet!' }));
routes.post('/avatar/:id/', upload.single('file'), AvatarController.store);
routes.post('/files', upload.single('file'), FileController.store);
routes.post('/sessions', SessionController.store);

routes.get('/sender/:id/pendings', DeliveryPendingController.index);
routes.get('/sender/:id/deliveries', DeliveryDeliveredController.index);
routes.put(
  '/sender/:senderId/delivery/:deliveryId',
  DeliveryPickupController.update
);
routes.put(
  '/sender/:senderId/delivery/:deliveryId/done',
  DeliveryDoneController.update
);

routes.post('/delivery/:id/problems', DeliveryProblemController.store);

routes.get('/sender/:id', SenderController.show);

routes.use(authMiddleware);

routes.get('/recipient', RecipientController.index);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.destroy);
routes.get('/recipients/:id', RecipientController.show);

routes.get('/sender', SenderController.index);
routes.post('/sender', SenderController.store);
routes.put('/sender', SenderController.update);
routes.delete('/sender/:id', SenderController.destroy);

routes.post('/delivery', DeliveryController.store);
routes.get('/delivery', DeliveryController.index);
routes.get('/delivery/:id', DeliveryController.show);
routes.put('/delivery', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.destroy);

routes.get('/deliveries/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.delete(
  '/problem/:id/cancel-delivery',
  DeliveryProblemController.destroy
);

export default routes;
