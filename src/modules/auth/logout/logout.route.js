import { logoutController } from "./logout.controller";

export default function logoutRouter(express, middleware) {
  const router = express.Router();
  router.route('/').post( middleware,logoutController);

  return router;
}
