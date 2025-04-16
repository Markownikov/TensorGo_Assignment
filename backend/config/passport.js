const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/auth/google/callback",
      // Remove scope from here as it's defined in the routes
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists by Google ID
        let user = await User.findOne({ googleId: profile.id });

        // If user exists by Google ID, return the user
        if (user) {
          return done(null, user);
        }
        
        // If no user with this Google ID, check if email already exists
        const existingUserByEmail = await User.findOne({ email: profile.emails[0].value });
        
        if (existingUserByEmail) {
          // Update existing user with Google ID and other Google info
          existingUserByEmail.googleId = profile.id;
          // Update profile picture if it doesn't exist
          if (!existingUserByEmail.profilePicture && profile.photos && profile.photos[0]) {
            existingUserByEmail.profilePicture = profile.photos[0].value;
          }
          // Save the updated user
          await existingUserByEmail.save();
          return done(null, existingUserByEmail);
        }

        // Create new user if not exists
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          profilePicture: profile.photos[0]?.value,
        });

        await user.save();
        done(null, user);
      } catch (err) {
        console.error("Error in Google strategy:", err);
        done(err, null);
      }
    }
  )
);
