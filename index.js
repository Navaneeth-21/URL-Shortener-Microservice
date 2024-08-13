require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const crypto = require('crypto');
const validator = require('validator');
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// In-memory storage for URL mappings
const urlMap = new Map();

app.post("/api/shorturl", (req, res) => {

  let {url} = req.body;
  
  if (!url || !validator.isURL(url)) {
    return res.json({error:'invalid url'})
  }

  else{
    const hash = crypto.createHash('md5').update(url).digest('hex');
    const shortUrlInt = parseInt(hash.slice(0, 8), 16);

    // store the mapping
    urlMap.set(shortUrlInt,url);

    return res.json({
      original_url: url,
      short_url: shortUrlInt,
    });
  }
});


app.get('/api/shorturl/:shorturl' , (req,res)=>{
  const url = parseInt(req.params.shorturl , 10);
  const original_url = urlMap.get(url);
  if(original_url){
    res.redirect(original_url);
  }
  else{
    res.json({error:'invalid url'})
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
