import { Workspace } from '../../../core/database/mongoDB/models/workspace.model.js';
import { User } from '../../../core/database/mongoDB/models/user.model.js';
import { Channel } from '../../../core/database/mongoDB/models/channel.model.js';


export async function getWorkspaceDetailsUsecase({ workspaceId }) {
  const workspace = await Workspace.findById(workspaceId).lean();
  if (!workspace) throw new Error('Workspace not found');

  // Populate createdBy info
  const createdByUser = await User.findById(workspace.createdBy).select('name email').lean();

  // Prepare members with populated user info where possible
  const populatedMembers = await Promise.all(
    workspace.members.map(async (member) => {
      if (member.userId) {
        const user = await User.findById(member.userId).select('name email').lean();
        return {
          ...member,
          userId: member.userId,
          name: user?.name || member.name || 'Unknown',
          email: user?.email || member.email,
        };
      } else {
        // For invited but not registered users
        return {
          ...member,
          name: member.name || 'Pending User',
          email: member.email,
        };
      }
    })
  );

    // Fetch full channel info
  const channels = await Channel.find({ _id: { $in: workspace.channels } })
    .select('name createdBy createdAt')
    .populate('createdBy', 'name email')
    .lean();

  const populatedChannels = channels.map(channel => ({
    _id: channel._id,
    name: channel.name,
    createdBy: {
      _id: channel.createdBy?._id || null,
      name: channel.createdBy?.name || 'Unknown',
      email: channel.createdBy?.email || 'unknown@example.com',
    },
    createdAt: channel.createdAt,
  }));

  return {
    workspaceId: workspace._id,
    name: workspace.name,
    createdBy: {
      _id: workspace.createdBy,
      name: createdByUser?.name || 'Unknown',
      email: createdByUser?.email || 'unknown@example.com',
    },
    members: populatedMembers,
    channels: populatedChannels,
    createdAt: workspace.createdAt,
    updatedAt: workspace.updatedAt,
  };
}
