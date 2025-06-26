import { getWorkspaceAttendanceSummaryController, getMemberAttendanceSummaryController } from './getattendance.controller.js';


export default function attendanceSummaryRouter(express, authMiddleware) {
  const router = express.Router();

  // Summary for all active members
  router.get('/:workspaceId', authMiddleware, getWorkspaceAttendanceSummaryController);

  // Summary for specific member
  router.get('/:workspaceId/:userId', authMiddleware, getMemberAttendanceSummaryController);

  return router;
}
