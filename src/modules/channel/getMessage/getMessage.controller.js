import { getChannelMessagesUsecase } from "./getMessage.usecase";
import config from "../../../config/config";

export async function getChannelMessagesController(req, res) {
  try {
    const userId = req.user.userId; // from auth middleware
    const { channelId } = req.params;

    const messages = await getChannelMessagesUsecase({ userId, channelId });

    const formatted = messages.map(msg => ({
      ...msg.toObject(),
      files: msg.files.map(file => `http://${config.ip}:${config.port}/${file}`)
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}