import connectDB from "./config/db.js";
import app from "./server.js";

connectDB();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
