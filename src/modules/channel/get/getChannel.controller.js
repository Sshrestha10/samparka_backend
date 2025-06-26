// controllers/channel.controller.js
import { Channel } from '../../../core/database/mongoDB/models/channel.model.js';
import { Message } from '../../../core/database/mongoDB/models/message.model.js';
import { Workspace } from '../../../core/database/mongoDB/models/workspace.model.js';

export async function getAllChannelsForWorkspace(req, res, next) {
  try {
    const { workspaceId } = req.params;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ message: 'Workspace not found' });

    const channels = await Channel.find({ workspaceId })
      .populate('createdBy', 'name email')
      .lean();

    const enrichedChannels = await Promise.all(
      channels.map(async (channel) => {
        const messages = await Message.find({ channelId: channel._id })
          .populate('sender', 'name email')
          .sort({ createdAt: 1 }) // ascending order
          .lean();

        const latestMessage = messages.at(-1); // last message

        return {
          _id: channel._id,
          name: channel.name,
          createdBy: channel.createdBy,
          createdAt: channel.createdAt,
          latestMessage: latestMessage
            ? {
                content: latestMessage.content,
                files: latestMessage.files,
                createdAt: latestMessage.createdAt,
                sender: latestMessage.sender
                  ? {
                      _id: latestMessage.sender._id,
                      name: latestMessage.sender.name,
                      email: latestMessage.sender.email
                    }
                  : null
              }
            : null,
          messages: messages.map((m) => ({
            _id: m._id,
            content: m.content,
            files: m.files,
            createdAt: m.createdAt,
            sender: m.sender
              ? {
                  _id: m.sender._id,
                  name: m.sender.name,
                  email: m.sender.email
                }
              : null
          }))
        };
      })
    );

    res.status(200).json({ channels: enrichedChannels });
  } catch (err) {
    next(err);
  }
}


export async function getChannelDetail(req, res, next) {
  try {
    const { workspaceId, channelId } = req.params;

    const channel = await Channel.findOne({ _id: channelId, workspaceId })
      .populate('createdBy', 'name email')
      .lean();

    if (!channel) return res.status(404).json({ message: 'Channel not found in this workspace' });

    const messages = await Message.find({ channelId })
      .populate('sender', 'name email')
      .sort({ createdAt: 1 })
      .lean();

    res.status(200).json({
      channel: {
        _id: channel._id,
        name: channel.name,
        createdBy: channel.createdBy,
        createdAt: channel.createdAt,
        messages: messages.map((m) => ({
          _id: m._id,
          content: m.content,
          files: m.files,
          createdAt: m.createdAt,
          sender: m.sender
            ? {
                _id: m.sender._id,
                name: m.sender.name,
                email: m.sender.email
              }
            : null
        }))
      }
    });
  } catch (err) {
    next(err);
  }
}
