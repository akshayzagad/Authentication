import app from "./src/app.js";
import connectDB from "./src/config/database.js";
await connectDB();
app.listen(3000, () => {
  console.log("server is running on 3000");
});
