import { Attendance } from '../../../core/database/mongoDB/models/attendance.model.js';
import { validateActiveMembership } from '../../../core/utils/validateWorkspaceMembership.js';

export async function getAttendanceSummaryUsecase({ workspaceId, userId, period }) {
  await validateActiveMembership(workspaceId, userId);

  const now = new Date();

  // Calculate startDate & endDate based on period
  let startDate;
  let endDate = new Date(now);
  endDate.setHours(23, 59, 59, 999);

  switch (period) {
    case 'daily':
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      break;

    case 'weekly': {
      const dayOfWeek = now.getDay(); // 0 (Sun) - 6 (Sat)
      startDate = new Date(now);
      startDate.setDate(now.getDate() - dayOfWeek);
      startDate.setHours(0, 0, 0, 0);
      break;
    }

    case 'monthly':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      startDate.setHours(0, 0, 0, 0);
      break;

    default:
      throw new Error('Invalid period');
  }

  // Fetch attendance records for that range
  const records = await Attendance.find({
    userId,
    workspaceId,
    date: { $gte: startDate, $lte: endDate }
  }).sort({ date: 1 });

  // Aggregate counts for statuses
  const summary = {
    period,          // added here
    totalDays: 0,
    present: 0,
    absent: 0,
    on_leave: 0,
    records: []
  };

  for (const rec of records) {
    summary.totalDays++;
    summary[rec.status] = (summary[rec.status] || 0) + 1;
    summary.records.push({
      date: rec.date,
      checkIn: rec.checkIn,
      checkOut: rec.checkOut,
      status: rec.status
    });
  }

  return summary;
}
