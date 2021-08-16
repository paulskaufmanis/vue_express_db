require("dotenv");
const express = require("express");
const mongodb = require("mongodb");

require("dotenv").config();

const router = express.Router();

// GET postas
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add post

router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// Delete post

router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    process.env.MONOGO_DB_CONNECTION,
    {
      useNewUrlParser: true,
    }
  );
  // console.log(client.db("awsome-project").collection("posts"));
  return client.db("awsome-project").collection("posts");
}

module.exports = router;
