import mongoose from 'mongoose';
import { DEPARTMENTS } from '../../../constants/department.enum.js';

const MemberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: { type: String, required: true },
  name: { type: String }, // optional for invited users
  role: {
    type: String,
    enum: ['admin', 'manager', 'member'],
    default: 'member'
  },
  department: {
    type: String,
    enum: Object.values(DEPARTMENTS),
    default: DEPARTMENTS.IT
  },
  accepted: { type: Boolean, default: false },
  removed: { type: Boolean, default: false },
  joinedAt: { type: Date, default: Date.now }
}, { _id: false });

const WorkspaceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [MemberSchema],
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
}, { timestamps: true });

export const Workspace = mongoose.model('Workspace', WorkspaceSchema);
