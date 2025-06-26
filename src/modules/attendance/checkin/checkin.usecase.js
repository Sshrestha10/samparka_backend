import { Attendance } from "../../../core/database/mongoDB/models/attendance.model.js";
import { validateActiveMembership } from "../../../core/utils/validateWorkspaceMembership.js";

export async function checkInUsecase({ userId, workspaceId }) {
  // ✅ Validate workspace and user membership
  await validateActiveMembership(workspaceId, userId);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize

  // ✅ Prevent duplicate check-in
  const existing = await Attendance.findOne({ userId, workspaceId, date: today });
  if (existing?.checkIn) {
    throw new Error('Already checked in today.');
  }

  // ✅ Create or update attendance
  const attendance = await Attendance.findOneAndUpdate(
    { userId, workspaceId, date: today },
    {
      $setOnInsert: { date: today },
      $set: { checkIn: new Date(), status: 'present' }
    },
    { upsert: true, new: true }
  );

  return attendance;
}
