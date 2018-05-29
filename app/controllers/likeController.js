const mongoose = require('mongoose');

const Tweet = mongoose.model('Tweet');

module.exports = {
  async toggle(req, res, next) {
    try {
      const tweet = await Tweet.findById(req.params.id);
      const liked = tweet.likes.indexOf(req.userId);

      if (liked === -1) {
        tweet.likes.push(req.userId);
      } else {
        tweet.likes.splice(liked, 1);
      }

      await tweet.save();

      return res.json(tweet);
    } catch (err) {
      return next(err);
    }
  },
};
