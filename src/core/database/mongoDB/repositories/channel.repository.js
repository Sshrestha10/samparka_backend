import { Channel } from '../models/channel.model.js';

export const channelRepository = {
  async createChannel({ workspaceId, name, createdBy }) {
    return Channel.create({ workspaceId, name, createdBy });
  },

  async findByWorkspace(workspaceId) {
    return Channel.find({ workspaceId });
  },

  async findById(channelId) {
    return Channel.findById(channelId);
  }
};