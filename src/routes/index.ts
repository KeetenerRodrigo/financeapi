import { Router } from 'express';
import users from './user.routes';

const routes = Router();

routes.use('/users', users);

export default routes;
