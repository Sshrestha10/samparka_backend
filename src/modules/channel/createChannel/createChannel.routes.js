import { createChannelController } from "./createChannel.controller";


export default function createChannelRouter(express, authMiddleware) {
  const router = express.Router({ mergeParams: true });
  router.post('/:workspaceId/createChannel', authMiddleware, createChannelController);
  return router;
}