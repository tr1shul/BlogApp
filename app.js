var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

//App Config
mongoose.connect('mongodb://localhost:27017/blog_app', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//mongoose model/schema config
var blogSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
  });

var Blog = mongoose.model("Blog", blogSchema);

//RESTful routes
app.get("/blogs", function(req, res)
{
  res.render("index");
});

app.listen(8080, 'localhost', function()
{
  console.log("BlogApp Server has started!");
});
