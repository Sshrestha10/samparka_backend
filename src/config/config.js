//Load .env BEFORE importing config
import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  ip: process.env.HOST || '0.0.0.0',
  mongo: {
    uri: process.env.MONGO_URL || 'mongodb://localhost:27017/samparka'
  },
  accessSecret: process.env.ACCESS_SECRET || 'jkl!±@£!@ghj1237access',
  refreshSecret: process.env.REFRESH_SECRET || 'jkl!±@£!@ghj1237refresh'

};