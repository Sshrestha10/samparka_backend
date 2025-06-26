import { updateAttendanceController } from "./updateattendance.controller";

export default function updateAttendanceRouter(express, authMiddleware) {
  const router = express.Router();
  router.patch('/update', authMiddleware,  updateAttendanceController);
  return router;
}

