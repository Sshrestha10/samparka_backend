import { loginUser } from '../login/login.usecase';

export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    return res.status(200).json(result);
  } catch (error) {
    next(error); // use your error handling middleware
  }
}
