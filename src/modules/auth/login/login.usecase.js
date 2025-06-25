import { userRepository } from '../../../core/database/mongoDB/repositories/user.repository.js';
import { tokenService } from '../../../core/services/token.service.js';
import { passwordService } from '../../../core/services/password.service.js';
import { syncUserWorkspaceInvites } from '../../../core/utils/syncUserWorkspaceInvites.js';

export async function loginUser({ email, password }) {
  let user = await userRepository.findByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const isValid = await passwordService.comparePassword(password, user.passwordHash);
  if (!isValid) throw new Error('Invalid credentials');

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