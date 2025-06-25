
import { sendDirectMessageController } from "./sendDM.controller";
import { uploadDMFile } from "../../../core/webserver/middlewares/uploadDM.middleware";

export default function sendDMRouter(express, authMiddleware) {
  const router = express.Router();
  router.post('/send', authMiddleware,  uploadDMFile.array('files', 5), sendDirectMessageController);
  return router;
}

