
import { getChannelMessagesController } from "./getMessage.controller";

export default function getChannelMessageRouter(express, authMiddleware) {
  const router = express.Router();
  router.get('/:channelId/getMessages', authMiddleware,  getChannelMessagesController);
  return router;
}


