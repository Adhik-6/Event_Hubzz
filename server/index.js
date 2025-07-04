import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
// import ngrok from "ngrok";
import { connectDB } from "./utils/index.utils.js";
import { errorHandler } from "./middlewares/index.middlewares.js";
import { authRouter, eventRouter, userRouter, analyticsRouter } from "./routes/index.routes.js";

const app = express();
dotenv.config();

const frontEndUrl = (process.env.NODE_ENV==="production")?(process.env.CLIENT_URL).trim():process.env.CLIENT_URL_DEV
const backEndUrl = (process.env.NODE_ENV==="production")?process.env.SERVER_URL:process.env.SERVER_URL_DEV
// console.log("frontend url:", frontEndUrl)

app.use(express.json({ limit: "50mb" })); 
app.use(cookieParser())
app.use(cors({
    origin: frontEndUrl,
    credentials: true, 
    methods: "GET, POST, PATCH, DELETE",
  })
);
app.options('*', cors()); // handle preflight

app.get("/", (req, res) => {
  res.send("This is Event Hubzz API Home Page");
});
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter)
app.use('/api/analytics', analyticsRouter)

app.use(errorHandler);

const startBackend = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server running on ${backEndUrl}`);
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
