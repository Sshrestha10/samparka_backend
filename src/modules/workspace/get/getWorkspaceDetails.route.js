import { getWorkspaceDetailsController } from "./getWorkspaceDetails.controller";

export default function getWorkspaceDetailsRouter(express, authMiddleware) {
  const router = express.Router();
  router.get('/:workspaceId', authMiddleware, getWorkspaceDetailsController);
  return router;
}