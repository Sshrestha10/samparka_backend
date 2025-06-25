import { inviteMembersController } from "./sendInvite.controller";


export default function sendInviteRouter(express, authMiddleware) {
  const router = express.Router();

  router.post('/:workspaceId/invite', authMiddleware, inviteMembersController);

  return router;
}
