export default function serverConfig(app, mongoose, config) {
  // 🩺 Healthcheck route: checks MongoDB & Redis
  app.get('/healthcheck', async (req, res) => {
    try {
      /*
      States:
      0 = disconnected
      1 = connected
      2 = connecting
      3 = disconnecting
    */
      // Check MongoDB connection
      const mongoState = mongoose.connection.readyState;

      if (mongoState !== 1) {
        throw new Error('MongoDB not connected');
      }

      // All services OK
      res.status(200).json({
        status: 'ok',
        services: {
          mongo: 'connected',
        },
      });
    } catch (err) {
      res.status(503).json({
        status: 'error',
        message: err.message,
      });
    }
  });

  //  Start the Express server
  function startServer() {
    const server = app.listen(config.port, config.ip, () => {
      console.log(
        `🚀 Server running at http://${config.ip}:${config.port} in ${app.get('env')} mode`
      );
    });

    // 🧼 Graceful shutdown on Ctrl+C
    process.on('SIGINT', async () => {
      console.log('\n🛑 Caught SIGINT. Cleaning up...');

      try {
        if (mongoose.connection.readyState === 1) {
          await mongoose.disconnect();
          console.log('🧹 MongoDB disconnected');
        }

        server.close(() => {
          console.log('✅ Server closed. Exiting.');
          process.exit(0);
        });
      } catch (err) {
        console.error('❌ Error during shutdown:', err);
        process.exit(1);
      }
    });
  }

  return { startServer };
}
