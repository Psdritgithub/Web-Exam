var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var db = require("./db");
db();

var televisionsSchema = new mongoose.Schema({
  pid: Number,
  modelName: String,
  brand: String,
  price: Number,
  size: Number,
});

var televisionsModel = mongoose.model("televisions", televisionsSchema);

var app = express();
app.use(cors());
app.use(express.json());

app.get("/televisions", async (req, res) => {
  try {
    var result = await televisionsModel.find();
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

app.post("/televisions", async (req, res) => {
  try {
    const record = new televisionsModel(req.body);
    await record.save();
    res.send("Tv Added");
  } catch (err) {
    res.send(err.message);
  }
});

app.delete("/televisions/:pid", async (req, res) => {
  try {
    await televisionsModel.deleteOne({ pid: req.params.pid });
    res.send(req.params.pid + "deleted");
  } catch (err) {
    res.send(err.message);
  }
});
app.listen(9000);
