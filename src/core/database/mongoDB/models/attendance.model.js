import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
  date: { type: Date, required: true }, // Store only date (no time)
  checkIn: { type: Date },
  checkOut: { type: Date },
  status: {
    type: String,
    enum: ['present', 'absent', 'on_leave'],
    default: 'present'
  }
}, { timestamps: true });

attendanceSchema.index({ userId: 1, workspaceId: 1, date: 1 }, { unique: true });

export const Attendance = mongoose.model('Attendance', attendanceSchema);

