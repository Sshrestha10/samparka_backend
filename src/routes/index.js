// import userRouter from './user';
import homeRouter from './home.route';
import authMiddleware from '../core/webserver/middlewares/auth.middleware';
import signupRouter from '../modules/auth/signup/signup.route';
import loginRouter from '../modules/auth/login/login.route';
import refreshTokenRouter from '../modules/auth/token/refreshtoken.route';
import logoutRouter from '../modules/auth/logout/logout.route';
import createWorkspaceRouter from '../modules/workspace/createWorkspace/createWorkspace.route';
import sendInviteRouter from '../modules/workspace/sendInvite/sendInvite.route';
import acceptInviteRouter from '../modules/workspace/acceptInvite/acceptInvite.route';
import declineInviteRouter from '../modules/workspace/declineInvite/declineInvite.route';
import deleteWorkspaceRouter from '../modules/workspace/deleteWorkspace/deleteWorkspace.route';
import leaveWorkspaceRouter from '../modules/workspace/leaveWorkspace/leaveWorkspace.route';
import createChannelRouter from '../modules/channel/createChannel/createChannel.routes';
import sendMessageRouter from '../modules/channel/sendMessage/sendMessage.route';
import getChannelMessageRouter from '../modules/channel/getMessage/getMessage.route';
import sendDMRouter from '../modules/dm/sendDm/sendDM.routes';
import getDMRouter from '../modules/dm/getDm/getDM.routes';
import checkInRouter from '../modules/attendance/checkin/checkin.route';
import checkoutRouter from '../modules/attendance/checkout/checkout.route';
import updateAttendanceStatusRouter from '../modules/attendance/updateStatus/updateattendance.route';
import getAttendanceSummaryRouter from '../modules/attendance/summary/summary.routes';
import attendanceSummaryRouter from '../modules/attendance/get/getattendance.routes';
import getWorkspaceDetailsRouter from '../modules/workspace/get/getWorkspaceDetails.route';
import getChannelsForWorkspaceRouter from '../modules/channel/get/getChannel.route';


export default function routes(app, express) {
  app.use('/', homeRouter(express));
  app.use('/api/v1/signup', signupRouter(express));
  app.use('/api/v1/login', loginRouter(express));
  app.use('/api/v1/refresh', refreshTokenRouter(express));
  app.use('/api/v1/logout', logoutRouter(express, authMiddleware));

  //workspace
  app.use('/api/v1/workspace', createWorkspaceRouter(express, authMiddleware));
  app.use('/api/v1/workspace', getWorkspaceDetailsRouter(express, authMiddleware));
  app.use('/api/v1/workspace', sendInviteRouter(express, authMiddleware));
  app.use('/api/v1/workspace', acceptInviteRouter(express, authMiddleware));
  app.use('/api/v1/workspace', declineInviteRouter(express, authMiddleware));
  app.use('/api/v1/workspace', deleteWorkspaceRouter(express, authMiddleware));
  app.use('/api/v1/workspace', leaveWorkspaceRouter(express, authMiddleware));
  app.use('/api/v1/workspace', createChannelRouter(express, authMiddleware));
  app.use('/api/v1/workspace', getChannelsForWorkspaceRouter(express, authMiddleware));
  app.use('/api/v1/channel', sendMessageRouter(express, authMiddleware));
  app.use('/api/v1/channel', getChannelMessageRouter(express, authMiddleware));
  app.use('/api/v1/dm', sendDMRouter(express, authMiddleware));
  app.use('/api/v1/dm', getDMRouter(express, authMiddleware));
  app.use('/api/v1/attendance', checkInRouter(express, authMiddleware));
  app.use('/api/v1/attendance', checkoutRouter(express, authMiddleware));
  app.use('/api/v1/attendance', updateAttendanceStatusRouter(express, authMiddleware));
  app.use('/api/v1/attendance', getAttendanceSummaryRouter(express, authMiddleware));
  app.use('/api/v1/attendance', attendanceSummaryRouter(express, authMiddleware));

}
