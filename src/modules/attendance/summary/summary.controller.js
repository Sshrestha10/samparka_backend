import { getAttendanceSummaryUsecase } from "./summary.usecase";

export async function getAttendanceSummaryController(req, res, next) {
  try {
    const { workspaceId, userId } = req.params;
    const { period } = req.query; // 'daily' | 'weekly' | 'monthly'

    if (!['daily', 'weekly', 'monthly'].includes(period)) {
      return res.status(400).json({ message: 'Invalid period. Must be one of daily, weekly, monthly.' });
    }

    // Optional: validate req.user authorization here (e.g. same user or admin in workspace)

    const summary = await getAttendanceSummaryUsecase({ workspaceId, userId, period });

    res.status(200).json({ summary });
  } catch (error) {
    next(error);
  }
}
