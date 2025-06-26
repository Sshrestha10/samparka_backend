import { Attendance } from '../../../core/database/mongoDB/models/attendance.model.js';
import { validateActiveMembership, validateWorkspace } from '../../../core/utils/validateWorkspaceMembership.js';
import { User } from '../../../core/database/mongoDB/models/user.model.js';


async function calculateSummaryForUser(workspaceId, userId, period) {
  const now = new Date();
  let startDate;
  let endDate = new Date(now);
  endDate.setHours(23, 59, 59, 999);

  switch (period) {
    case 'daily':
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'weekly':
      const dayOfWeek = now.getDay();
      startDate = new Date(now);
      startDate.setDate(now.getDate() - dayOfWeek);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'monthly':
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      startDate.setHours(0, 0, 0, 0);
      break;
  }

  const records = await Attendance.find({
    userId,
    workspaceId,
    date: { $gte: startDate, $lte: endDate }
  }).sort({ date: 1 });

  return {
    totalDays: records.length,
    present: records.filter(r => r.status === 'present').length,
    absent: records.filter(r => r.status === 'absent').length,
    on_leave: records.filter(r => r.status === 'on_leave').length,
    records: records.map(r => ({
      date: r.date,
      checkIn: r.checkIn,
      checkOut: r.checkOut,
      status: r.status
    }))
  };
}

export async function getWorkspaceAttendanceSummaryUsecase({ workspaceId, period }) {
  const workspace = await validateWorkspace(workspaceId); 

  const summaries = [];

for (const member of workspace.members) {
    if (
      member.userId &&
      member.accepted &&
      !member.removed
    ) {
      const userSummary = await calculateSummaryForUser(workspaceId, member.userId.toString(), period);
      const user = await User.findById(member.userId).select('name email');

      summaries.push({
        userId: member.userId,
        name: user?.name || member.name || 'Unknown',
        email: user?.email || member.email || 'unknown@example.com',
        department: member.department,
        role: member.role,
        ...userSummary,
        period
      });
    }}

  return summaries;
}

export async function getMemberAttendanceSummaryUsecase({ workspaceId, userId, period }) {
  // Ensure the user is an accepted, active member of the workspace
  const workspace = await validateActiveMembership(workspaceId, userId);

  // Find the member metadata from workspace.members
  const member = workspace.members.find(
    (m) => m.userId?.toString() === userId && m.accepted && !m.removed
  );

  if (!member) throw new Error('User is not an accepted member of the workspace');

  // Get user's profile info (if registered)
  const user = await User.findById(userId).select('name email').lean();

  // Attendance summary calculation
  const summary = await calculateSummaryForUser(workspaceId, userId, period);

  return {
    userId,
    name: user?.name || member.name || 'Unknown',
    email: user?.email || member.email || 'unknown@example.com',
    department: member.department,
    role: member.role,
    ...summary,
    period
  };
}
