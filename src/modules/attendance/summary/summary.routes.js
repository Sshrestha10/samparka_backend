
import { getAttendanceSummaryController } from "./summary.controller";

export default function getAttendanceSummaryRouter(express, authMiddleware) {
  const router = express.Router();
  router.get('/summary/:workspaceId/:userId', authMiddleware,  getAttendanceSummaryController);
  return router;
}

