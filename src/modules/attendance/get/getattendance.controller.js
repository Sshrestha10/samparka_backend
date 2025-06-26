import { getWorkspaceAttendanceSummaryUsecase, getMemberAttendanceSummaryUsecase } from './getattendance.usecase.js';

export async function getWorkspaceAttendanceSummaryController(req, res, next) {
  try {
    const { workspaceId } = req.params;
    const { period = 'daily' } = req.query;

    const summaries = await getWorkspaceAttendanceSummaryUsecase({ workspaceId, period });

    res.status(200).json({ period, summaries });
  } catch (err) {
    next(err);
  }
}

export async function getMemberAttendanceSummaryController(req, res, next) {
  try {
    const { workspaceId, userId } = req.params;
    const { period = 'daily' } = req.query;

    const summary = await getMemberAttendanceSummaryUsecase({ workspaceId, userId, period });

    res.status(200).json(summary);
  } catch (err) {
    next(err);
  }
}
