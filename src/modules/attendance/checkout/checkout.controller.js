import { checkOutUsecase } from "./checkout.usecase";

export async function checkOutController(req, res, next) {
  try {
    const userId = req.user.userId;
    const { workspaceId } = req.body;

    const attendance = await checkOutUsecase({ userId, workspaceId });

    res.status(200).json({ message: 'Checked out successfully.', attendance });
  } catch (err) {
    next(err);
  }
}
