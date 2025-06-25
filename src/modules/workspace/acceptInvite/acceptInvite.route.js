import { acceptInviteController } from "./acceptInvite.controller";

export default function acceptInviteRouter(express, authMiddleware) {
  const router = express.Router();
  router.post('/:workspaceId/accept', authMiddleware, acceptInviteController);
  return router;
}