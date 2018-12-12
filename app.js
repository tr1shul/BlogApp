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

app.get("/", function(req, res)
{
  res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs", function(req, res)
{
  Blog.find({}, function(err, blogs)
  {
    if(err)
    {
      console.log(err);
    }
    else
    {
      res.render("index", {blogs: blogs});
    }
  });
});

//NEW ROUTE
app.get("/blogs/new", function(req, res)
{
  res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req, res)
{
  Blog.create(req.body.blog, function(err, newBlog)
  {
    if(err)
    {
      res.render("new")
    }
    else
    {
      res.redirect("/blogs");
    }
  })
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res)
{
  Blog.findById(req.params.id, function(err, foundBlog)
  {
    if(err)
    {
      res.redirect("/blogs");
    }
    else
    {
      res.render("show", {blog: foundBlog});
    }
  });
});

app.listen(8080, 'localhost', function()
{
  console.log("BlogApp Server has started!");
});
