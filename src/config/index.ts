export default {
  env: process.env.NODE_ENV || "development",

  port: process.env.PORT || 3000,

  database: {},

  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },

  session: {
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  },

  logging: {
    level: process.env.LOG_LEVEL || "info",
    dir: process.env.LOG_DIR || "logs",
  },

  security: {
    cors: {
      origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void,
      ) => {
        const whitelist = process.env.CORS_WHITELIST
          ? process.env.CORS_WHITELIST.split(",")
          : ["*"];
        if (!origin || whitelist.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      optionsSuccessStatus: 200,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
    helmet: {},
    jwt: {
      secret: process.env.JWT_SECRET || "your_jwt_secret_key",
      expiresIn: process.env.JWT_EXPIRES_IN || "1h", // Token expiry time
      algorithm: process.env.JWT_ALGORITHM || "HS256", // Algorithm used to sign the token
    },
  },
};
