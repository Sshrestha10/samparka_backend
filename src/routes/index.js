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


export default function routes(app, express) {
  app.use('/', homeRouter(express));
  app.use('/api/v1/signup', signupRouter(express));
  app.use('/api/v1/login', loginRouter(express));
  app.use('/api/v1/refresh', refreshTokenRouter(express));
  app.use('/api/v1/logout', logoutRouter(express, authMiddleware));

  //workspace
  app.use('/api/v1/workspace', createWorkspaceRouter(express, authMiddleware));
  app.use('/api/v1/workspace', sendInviteRouter(express, authMiddleware));
  app.use('/api/v1/workspace', acceptInviteRouter(express, authMiddleware));
  app.use('/api/v1/workspace', declineInviteRouter(express, authMiddleware));
  app.use('/api/v1/workspace', deleteWorkspaceRouter(express, authMiddleware));
  app.use('/api/v1/workspace', leaveWorkspaceRouter(express, authMiddleware));
}
