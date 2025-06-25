import { refreshTokenController } from './refreshtoken.controller';

export default function refreshTokenRouter(express) {
  const router = express.Router();
  router.route('/').post(refreshTokenController);

  return router;
}
