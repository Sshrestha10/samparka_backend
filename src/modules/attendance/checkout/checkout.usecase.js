import { Attendance } from "../../../core/database/mongoDB/models/attendance.model.js";
import { validateActiveMembership } from "../../../core/utils/validateWorkspaceMembership.js";

export async function checkOutUsecase({ userId, workspaceId }) {
  await validateActiveMembership(workspaceId, userId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await Attendance.findOne({ userId, workspaceId, date: today });

  if (!existing?.checkIn) {
    throw new Error('Cannot check out without checking in first.');
  }
  if (existing?.checkOut) {
    throw new Error('Already checked out today.');
  }

  existing.checkOut = new Date();
  await existing.save();

  return existing;
}
