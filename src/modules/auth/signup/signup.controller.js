import { signupUser } from './signup.usecase';

export async function signupController(req, res) {
  try {
    const { name, email, password } = req.body;
    const result = await signupUser({ name, email, password });
    return res.status(201).json(result);
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
      });
    }

    return res.status(400).json({ message: error.message || 'Something went wrong' });
  }
}
