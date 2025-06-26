// features/channel/usecases/createChannel.usecase.js
import { channelRepository } from '../../../core/database/mongoDB/repositories/channel.repository.js';
import { workspaceRepository } from '../../../core/database/mongoDB/repositories/workspace.repository.js';

export async function createChannelUsecase({ userId, workspaceId, channelName }) {
  const workspace = await workspaceRepository.findById(workspaceId);
  if (!workspace) throw new Error('Workspace not found');

  const member = workspace.members.find(m => m.userId?.toString() === userId);
  if (!member || !member.accepted || member.removed) {
    throw new Error('You are not a valid member of this workspace');
  }

  // Optional: Ensure channel name uniqueness within workspace
  const existingChannels = await channelRepository.findByWorkspace(workspaceId);
  const exists = existingChannels.some(c => c.name.toLowerCase() === channelName.toLowerCase());
  if (exists) throw new Error('Channel with this name already exists in the workspace');

  const channel = await channelRepository.createChannel({
    workspaceId,
    name: channelName,
    createdBy: userId
  });
  await workspaceRepository.findWorkspaceByIdAndUpdateChannel(
  workspaceId,
  channel._id 
);

  return { message: 'Channel created successfully', channel };
}
