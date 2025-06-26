import mongoose from 'mongoose';

const DirectMessageThreadSchema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]
}, { timestamps: true });

DirectMessageThreadSchema.index({ workspaceId: 1, participants: 1 }, { unique: false });

export const DirectMessageThread = mongoose.model('DirectMessageThread', DirectMessageThreadSchema);
