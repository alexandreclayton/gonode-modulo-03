const express = require('express');

const routes = express.Router();

const authMiddleware = require('./middlewares/auth');
const controllers = require('./controllers');

/**
 * Auth
 */
routes.post('/signin', controllers.authController.signin);
routes.post('/signup', controllers.authController.signup);


/**
 * ===========
 * Auth routes
 */
routes.use(authMiddleware);

/**
 * User
 */
routes.get('/users/me', controllers.userController.me);
routes.put('/users/:id', controllers.userController.update);
routes.get('/feed', controllers.userController.feed);

/**
 * Follows
 */
routes.post('/follow/:id', controllers.followController.create);
routes.post('/unfollow/:id', controllers.followController.destroy);

/**
 * Tweets
 */
routes.post('/tweets', controllers.tweetController.create);
routes.delete('/tweets/:id', controllers.tweetController.destroy);

/**
 * Likes
 */
routes.post('/like/:id', controllers.likeController.toggle);

/**
 * 404
 */
routes.use((req, res) => res.status(404).json({
  error: 'Route not found',
}));

module.exports = routes;
