import { createChannelUsecase } from "./createChannel.usecase";

export async function createChannelController(req, res) {
  try {
    const { channelName } = req.body;
    const { workspaceId } = req.params;
    const { userId } = req.user;

    const result = await createChannelUsecase({ userId, workspaceId, channelName });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
