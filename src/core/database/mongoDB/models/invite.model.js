import mongoose from 'mongoose';
const InviteSchema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  email: { type: String, required: true },
  memberType: { type: String, enum: ['admin', 'manager', 'member'], required: true },
  invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Invite = mongoose.model('Invite', InviteSchema);
