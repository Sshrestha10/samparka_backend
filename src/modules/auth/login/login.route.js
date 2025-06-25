import { loginController } from './login.controller';

export default function signupRouter(express) {
  const router = express.Router();
  router.route('/').post(loginController);

  return router;
}
