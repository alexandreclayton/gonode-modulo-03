const mongoose = require('mongoose');
const sendMail = require('../services/mailer');

const User = mongoose.model('User');

module.exports = {
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (!await user.compareHash(password)) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      return res.json({
        user,
        token: User.generateToken(user),
      });
    } catch (err) {
      return next(err);
    }
  },

  async signup(req, res, next) {
    const { email, username } = req.body;

    try {
      if (await User.findOne({ $or: [{ email }, { username }] })) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const user = await User.create(req.body);

      await sendMail({
        from: 'Diego Fernandes <diego@rocketseat.com.br>',
        to: user.email,
        subject: `Bem-vindo ao RocketTwitter, ${user.name}`,
        template: 'auth/register',
        context: {
          name: user.name,
          username: user.username,
        },
      });

      return res.json({
        user,
        token: User.generateToken(user),
      });
    } catch (err) {
      return next(err);
    }
  },
};
