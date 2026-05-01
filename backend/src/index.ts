import connectDB from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import app from "./server.js";

connectDB();

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
