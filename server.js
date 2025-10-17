require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 1234;
const DB = process.env.MONGODB_URI;
const userRouter = require("./router/user");
const productRouter = require("./router/product");
const paymentRouter = require("./router/payment");
const session = require("express-session");
const passport = require("passport");
require("./middleware/passport");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for mini swagger application",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from my private application.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://apple.com",
    },
  },
  servers: [
    // {
    //   url: "https://www.google.com",
    //   description: "Live server",
    // },
    {
      url: `http://localhost:${PORT}/api/v1`,
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/api/v1/*": {
      get: {
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./router/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", paymentRouter);

app.use("/", (req, res) => {
  res.send("Connected to Backend Server");
});

app.use((error, req, res, next) => {
  if (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
  next();
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log("Server is running on Port:", PORT);
    });
  })
  .catch((error) => {
    console.log("Error connecting to Database", error);
  });
