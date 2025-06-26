import { Attendance } from "../../../core/database/mongoDB/models/attendance.model.js";
import { validateActiveMembership } from "../../../core/utils/validateWorkspaceMembership.js";

export async function updateAttendanceUsecase({ userId, workspaceId, date, status }) {
  await validateActiveMembership(workspaceId, userId);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const updated = await Attendance.findOneAndUpdate(
    { userId, workspaceId, date: targetDate },
    { $set: { status } },
    { new: true, runValidators: true }
  );

  if (!updated) {
    throw new Error('Attendance record not found for the given date.');
  }

  return updated;
}
