import { userRepository } from '../../../core/database/mongoDB/repositories/user.repository.js';
import { tokenService } from '../../../core/services/token.service.js';
import { passwordService } from '../../../core/services/password.service.js';
import { syncUserWorkspaceInvites } from '../../../core/utils/syncUserWorkspaceInvites.js';

export async function signupUser({ name, email, password }) {
  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) throw new Error('User already exists');

  const passwordHash = await passwordService.hashPassword(password);
  let user = await userRepository.createUser({ name, email, passwordHash });

  user = await syncUserWorkspaceInvites(user);

  const tokens = tokenService.generateTokens({ userId: user._id, email });
  user.tokens = tokens;
  await user.save();

const workspaceList = user.workspaces
  .filter(ws => !ws.removed)
  .map(ws => ({
    workspaceId: ws.workspaceId,
    workspaceName: ws.workspaceName,
    memberType: ws.memberType,
    department: ws.department,
    accepted: ws.accepted,
    removed: ws.removed || false
  }));

  return {
    userId: user._id,
    name: user.name,
    email: user.email,
    tokens,
    workspaceList
  };
}