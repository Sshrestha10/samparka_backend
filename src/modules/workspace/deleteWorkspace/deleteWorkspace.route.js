import { deleteWorkspaceController } from "./deleteWorkspace.controller";

export default function deleteWorkspaceRouter(express, authMiddleware) {
  const router = express.Router();
  router.delete('/:workspaceId', authMiddleware, deleteWorkspaceController);
  return router;
}