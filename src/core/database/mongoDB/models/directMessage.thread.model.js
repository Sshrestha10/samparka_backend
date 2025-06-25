import mongoose from 'mongoose';

const DirectMessageThreadSchema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
}, { timestamps: true });

export const DirectMessageThread = mongoose.model('DirectMessageThread', DirectMessageThreadSchema);
