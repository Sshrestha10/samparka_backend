
import { uploadMessageFile } from "../../../core/webserver/middlewares/uploadChannelMessage.middleware";
import { sendMessageController } from "./sendMessage.controller";


export default function sendMessageRouter(express, authMiddleware) {
  const router = express.Router({ mergeParams: true });
  router.post('/:channelId/sendMessage', authMiddleware,  uploadMessageFile.array('files', 5), sendMessageController);
  return router;
}



