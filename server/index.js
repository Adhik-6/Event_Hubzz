import express from "express";
import cors from "cors";
// import ngrok from "ngrok";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import { connectDB } from "./utils/index.utils.js";
import { errorHandler } from "./middlewares/index.middlewares.js";
import { authRouter, eventRouter, userRouter } from "./routes/index.routes.js";

const app = express();
dotenv.config();

// app.use(express.json());
app.use(express.json({ limit: "50mb" })); 
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // Includes cookies in requests
    methods: "GET, POST, PATCH, DELETE",
  })
);

app.get("/", (req, res) => {
  res.send("This is Home Page");
});
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter)


app.use(errorHandler);
const startBackend = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on ${process.env.SERVER_URL}${process.env.PORT}`
      );
      // Start Ngrok and expose the backend
      // await ngrok.authtoken(process.env.NGROK_AUTH_TOKEN)
      // const ngrokUrl = await ngrok.connect({
      //   addr: process.env.PORT,
      //   // authtoken: process.env.NGROK_AUTH_TOKEN,
      //   // region: "in",
      //   domain: process.env.NGROK_DOMAIN, // Use the reserved domain
      // });

      // console.log(`Ngrok public URL: ${ngrokUrl}`)
    });
  } catch (err) {
    console.log("Error while connecting to Backend", err.message);
  }
};

startBackend();
