require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const caregiverRoutes = require("./routes/caregivers");
const path = require("path");

// express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
if (process.env.NODE_ENV === "production") {
  // Set static folder up in production
  const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) =>
    res.sendFile(path.join(frontendBuildPath, "index.html"))
  );
}

// routes
app.use("/api/caregivers", caregiverRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
