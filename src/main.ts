import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import languageRouter from "./routes/language.route";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/language", languageRouter);

app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `App listening at http://localhost:${port}\nCongrats, Mr.Gizatullin!`
  );
});
