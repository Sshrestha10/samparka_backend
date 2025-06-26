import { checkInUsecase } from "./checkin.usecase";

export async function checkInController(req, res, next) {
  try {
    const userId = req.user.userId;
    const { workspaceId } = req.body;

    const attendance = await checkInUsecase({ userId, workspaceId });

    res.status(200).json({ message: 'Checked in successfully.', attendance });
  } catch (err) {
    next(err);
  }
}
