import { Invite } from '../models/invite.model.js';

export const inviteRepository = {
  async findByEmail(email) {
    return Invite.find({ email, accepted: false });
  },
  async acceptInvite(inviteId) {
    return Invite.findByIdAndUpdate(inviteId, { accepted: true });
  },
};
