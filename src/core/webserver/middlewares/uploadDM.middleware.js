import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/messages/dm';
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
    cb(null, uniqueName);
  }
});


export const uploadDMFile = multer({
  storage: storage,
});
