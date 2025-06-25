import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, default: '' },
  files: [{ type: String }], // Array of file URLs or paths
  createdAt: { type: Date, default: Date.now }
});

export const Message = mongoose.model('Message', MessageSchema);