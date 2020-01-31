import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.get('/', (_, res) => res.send({ message: 'Welcome to FastFeet!' }));

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipient', RecipientController.index);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.destroy);

export default routes;
