const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nfyjflh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {

  try {
    const productCollection = client.db("emaJhon").collection("products");

    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      const count = await productCollection.estimatedDocumentCount();
      res.send({count, products});
    });
  } 

  finally {

  }
}

run().catch((err) => console.error(err));


app.get("/", (req, res) => {
  res.send("ema jhon server is running");
});

app.listen(port, () => {
  console.log(`ema jhon server running on ${port}`);
});
