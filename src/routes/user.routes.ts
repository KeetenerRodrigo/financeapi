import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import AuthenticateUser from '../services/AuthenticateUser';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name: name,
      email,
      password,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.post('/auth', async (request, response) => {
  const { email, password } = request.body;

  const authenticaUser = new AuthenticateUser();

  const user = await authenticaUser.execute({
    email,
    password,
  });

  console.log(user)

  return response.json({ user });
});

export default usersRouter;
