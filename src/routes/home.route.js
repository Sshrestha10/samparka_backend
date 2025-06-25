export default function homeRouter(express) {
  const router = express.Router();

  router.route('/').get((req, res) => {
    res.json({
      message: 'Welcome to the Samparka API!',
      availableRoutes: {
        login: '/api/v1/login',
      }
    });
  });

  return router;
}
