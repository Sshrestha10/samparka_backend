import { createWorkspace } from './createWorkspace.usecase.js';
import { userRepository } from '../../../core/database/mongoDB/repositories/user.repository.js';

export async function createWorkspaceController(req, res, next) {
  try {
    const { name, invites = [], department = 'IT' } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Workspace name is required' });
    }

    const user = await userRepository.findById(req.user.userId);

    const workspace = await createWorkspace({
      name,
      createdByUser: user,
      invites,
      department
    });

    return res.status(201).json({ message: 'Workspace created', workspace });
  } catch (err) {
    next(err);
  }
}
