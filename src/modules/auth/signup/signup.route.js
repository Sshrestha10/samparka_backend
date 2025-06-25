import { signupController } from './signup.controller';

export default function signupRouter(express) {
  const router = express.Router();
  router.route('/').post(signupController);

  return router;
}
