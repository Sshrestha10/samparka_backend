import { createWorkspaceController } from "./createWorkspace.controller";

export default function createWorkspaceRouter(express, authMiddleware) {
  const router = express.Router();

  router.post('/create', authMiddleware, createWorkspaceController);

  return router;
}
