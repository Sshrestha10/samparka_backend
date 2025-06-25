import mongoose from 'mongoose';

const DirectMessageSchema = new mongoose.Schema({
  threadId: { type: mongoose.Schema.Types.ObjectId, ref: 'DirectMessageThread', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, default: '' },
  files: [{ type: String }]
}, { timestamps: true });

export const DirectMessage = mongoose.model('DirectMessage', DirectMessageSchema);
