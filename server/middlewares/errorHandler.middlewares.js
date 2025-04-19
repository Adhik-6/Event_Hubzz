import dotenv from "dotenv";
dotenv.config();

export const errorHandler = (err, req, res, next) => {
  res.header("Access-Control-Allow-Origin", (process.env.NODE_ENV==="production")?(process.env.CLIENT_URL).trim():process.env.CLIENT_URL_DEV);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  console.log(`You've got ${err.name}: ${err.message} occured at ${err.at}`);
  console.log("Full error: ", err)

  if(err.message.includes("duplicate key"))
    return res.status(400).json({ success: false, message: "Mail ID already registered" });

  res.status(err.statusCode || 500).json({ success: false, message: err.message || "Something went wrong..." });
}
