import mongoose from 'mongoose';
import { userRepository } from '../../../core/database/mongoDB/repositories/user.repository.js';
import { inviteUserToWorkspace } from './sendInvite.usecase.js';

export async function inviteMembersController(req, res, next) {
  try {
    const { workspaceId } = req.params;
    const { invites } = req.body;

    if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
      return res.status(400).json({ message: 'Invalid workspace ID' });
    }

    if (!Array.isArray(invites) || invites.length === 0) {
      return res.status(400).json({ message: 'Invites must be a non-empty array' });
    }

    const user = await userRepository.findById(req.user.userId);

    const { addedMembers } = await inviteUserToWorkspace({
      invitedByUser: user,
      workspaceId,
      invites
    });

    return res.status(200).json({
      message: 'Members invited successfully',
      members: addedMembers
    });
  } catch (err) {
    next(err);
  }
}
