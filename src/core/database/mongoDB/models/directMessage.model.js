import mongoose from 'mongoose';
const DirectMessageSchema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    fileUrl: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

module.exports.DirectMessage = mongoose.model('DirectMessage', DirectMessageSchema);
