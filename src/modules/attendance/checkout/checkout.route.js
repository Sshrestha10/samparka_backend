
import { checkOutController } from "./checkout.controller";

export default function checkoutRouter(express, authMiddleware) {
  const router = express.Router();
  router.post('/checkout', authMiddleware,  checkOutController);
  return router;
}

