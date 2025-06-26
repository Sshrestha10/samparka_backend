import { updateAttendanceUsecase } from "./updateattendance.usecase";

export async function updateAttendanceController(req, res, next) {
  try {
    const userId = req.user.userId;
    const { workspaceId, date, status } = req.body;

    const attendance = await updateAttendanceUsecase({ userId, workspaceId, date, status });

    res.status(200).json({ message: 'Attendance updated.', attendance });
  } catch (err) {
    next(err);
  }
}
