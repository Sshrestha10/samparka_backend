import mongoose from 'mongoose';
const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
  date: { type: Date, required: true },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['present', 'absent'], default: 'present' },
  createdAt: { type: Date, default: Date.now }
});

export const Attendance = mongoose.model('Attendance', AttendanceSchema);
