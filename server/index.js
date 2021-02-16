const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
//Require route files
const bulkUpload=require("./apis/bulkUpload/bulkUpload");
const seedData = require("./apis/seedingData/seedingData");
const categoryDetails = require("./apis/categoryDetails/categoryDetails");
const leadDetail = require("./apis/leadDetail/leadDetail");
const userDetail = require("./apis/userDetails/userDetails");
const stores = require("./apis/stores/stores");
const blogs = require("./apis/blogs/blogs")
const passport = require("passport");
const multer = require('multer');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(express.static('public'))
app.use('/api', createProxyMiddleware({ target: 'http://localhost:4200', changeOrigin: true }));

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/public/vehicles')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage })

app.use(cors());

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file)
    res.json({
      imageUrl: `images/uploads/${req.file.filename}`
    });
  else
    res.status("409").json("No Files to Upload.")
});



// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

//middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use("/apis/bulkUpload",bulkUpload);
app.use("/apis/seedData", seedData);
app.use("/apis/categoryDetails", categoryDetails);
app.use("/apis/leadDetail", leadDetail);
app.use("/apis/userDetail", userDetail);
app.use("/apis/stores", stores);
app.use("/apis/blogs", blogs);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.get("/", function (req, res) {
  res.send("Hello World");
});

const port = process.env.PORT || 4200;

app.listen(port);
