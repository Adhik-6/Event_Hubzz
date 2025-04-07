
export const errorHandler = (err, req, res, next) => {
  console.log(`You've got ${err.name}: ${err.message} occured at ${err.at}`);
  console.log("Full error: ", err)

  if(err.message.includes("duplicate key"))
    res.status(400).json({ success: false, message: "Mail ID already registered" });

  res.status(err.statusCode || 500).json({ success: false, message: err.message || "Something went wrong..." });
}
