import { dmRepository } from "../../../core/database/mongoDB/repositories/dm.repository";

export async function getDMsUsecase({ workspaceId, userId, recipientId }) {
  const thread = await dmRepository.findOrCreateThread({ workspaceId, userId, recipientId });

  const messages = await dmRepository.getMessagesByThread(thread._id);

  return { threadId: thread._id, messages };
}
