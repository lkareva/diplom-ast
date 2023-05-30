const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User')
const config = require('config')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get('jwtSecret')
}

module.exports = passport => {
  passport.use(
      new JwtStrategy(options, async (payload, done) => {
        try {
          const user = await User.findOne({userId: payload.id});


          if(user) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch(e) {
          console.log(e)
        }

      })
  )
}
