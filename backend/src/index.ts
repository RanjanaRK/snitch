import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import app from "./server.js";

connectDB();

app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
