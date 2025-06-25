import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
  access: { type: String, required: true },
  refresh: { type: String, required: true },
}, { _id: false });

const WorkspaceMemberSchema = new mongoose.Schema({
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  workspaceName: { type: String, required: true },
  memberType: { type: String, enum: ['admin', 'manager', 'member'], required: true },
  accepted: { type: Boolean, default: false },
  removed: { type: Boolean, default: false },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true ,unique:false},
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },  // store hashed password
  tokens: TokenSchema,
  workspaces: [WorkspaceMemberSchema],
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
