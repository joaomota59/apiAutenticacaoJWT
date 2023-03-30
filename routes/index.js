import {Router} from 'express'

import UserController from '../controllers/UserController.js'

import verifyToken from '../middlewares/index.js';

const routes = Router();

routes.get('/', UserController.index);

routes.post('/auth/register', UserController.store);

routes.post('/auth/login', UserController.login);

routes.get('/user/:id', verifyToken, UserController.profile);

export default routes;