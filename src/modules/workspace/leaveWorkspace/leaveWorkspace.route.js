import { leaveWorkspaceController } from './leaveWorkspace.controller.js';

export default function leaveWorkspaceRouter(express,authMiddleware) {
  const router = express.Router();
  router.post('/:workspaceId/leave', authMiddleware, leaveWorkspaceController);
  return router;
}
