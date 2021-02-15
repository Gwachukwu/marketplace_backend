const express = require("express");
const cors = require("cors");

const app = express();
const connectDB = require("./model/connect");
// const transactionRoutes = require("./routes/transactions");
// const userRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");
// const accessRoutes = require("./routes/accessTransactions");

require("dotenv").config();

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(userRoutes);
// app.use(transactionRoutes);
// app.use(authRoutes);
// app.use(accessRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
