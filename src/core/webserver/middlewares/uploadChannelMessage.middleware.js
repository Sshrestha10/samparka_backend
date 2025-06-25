import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const channelId = req.params.channelId;
    const dir = `uploads/messages/${channelId}`;

    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

export const uploadMessageFile = multer({ storage: storage });
