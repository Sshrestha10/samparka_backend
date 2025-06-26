import { getAllChannelsForWorkspace, getChannelDetail } from './getChannel.controller'

export default function getChannelsForWorkspaceRouter(express, authMiddleware) {
  const router = express.Router();
  router.get('/:workspaceId/channels', authMiddleware, getAllChannelsForWorkspace);
  router.get('/:workspaceId/channels/:channelId', authMiddleware, getChannelDetail);

  return router;
}