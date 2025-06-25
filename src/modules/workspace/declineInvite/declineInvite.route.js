import { declineInviteController } from './declineInvite.controller.js';

export default function declineInviteRouter(express,authMiddleware) {
  const router = express.Router();
  router.post('/:workspaceId/decline', authMiddleware, declineInviteController);
  return router;
}
