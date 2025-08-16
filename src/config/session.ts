import session from "express-session";
import MongoStore from "connect-mongo";

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = process.env.MONGODB_DATABASE_NAME!;

export function sessionMiddleware() {
  const mongoSessionStore = MongoStore.create({
    mongoUrl: MONGODB_URI,
    dbName: DB_NAME,
    // optional collection name
    collectionName: "sessions",
  });

  return session({
    name: "sid",
    secret: "development-session-secret",
    resave: false,
    saveUninitialized: false,
    store: mongoSessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      //   httpOnly: true,
      secure: false, // set true on HTTPS
      sameSite: "lax", // 'lax' is a good default
    },
  });
}
