const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

db.on("connected", () => {
  console.log(
    `Mongoose connected to MongoDB ${db.name} on ${db.host}:${db.port}.`
  );
});

module.exports = mongoose;
