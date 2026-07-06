import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// App configuration
const app = express();
const port = process.env.PORT || 5000;

// Database and Cloudinary configuration
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Frontend React app URL
      "http://localhost:5174", // Admin React app URL (if running separately)
      "*", // Allow all origins (for development purposes)
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
  })
);

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// Default route for testing API status
app.get("/", (req, res) => {
  res.send("API Working");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start the server (ignored by Vercel, used for local dev)
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server started on PORT: ${port}`);
  });
}

// Export the Express app to be used by Vercel Serverless Functions
export default app;
