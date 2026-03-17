const { Router } = require('express');
const pomodoroRouter = require('./pomodoro/pomodoro.router');

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);

  // Health check
  const health = (req, res) => {
    res.sendStatus(200);
  };

  router.get('/', health);

  // Conectar routers
  router.use(pomodoroRouter);
}

module.exports = routerApi;
