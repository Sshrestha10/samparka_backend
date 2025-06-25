
import { getDMsController } from "./getDM.controller";

export default function getDMRouter(express, authMiddleware) {
  const router = express.Router();
  router.get('/:workspaceId/:recipientId/messages', authMiddleware, getDMsController);
  return router;
}

