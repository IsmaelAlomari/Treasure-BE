const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { User } = require("../db/models");
const JWT_SECRET = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username: username },
    });
    const passwordsMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    return done(null, passwordsMatch ? user : false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: "asupersecretkey",
  },

  async (payload, done) => {
    if (Date.now() > payload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findByPk(payload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
