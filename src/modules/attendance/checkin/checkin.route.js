
import { checkInController } from "./checkin.controller";

export default function checkInRouter(express, authMiddleware) {
  const router = express.Router();
  router.post('/checkin', authMiddleware,  checkInController);
  return router;
}

