var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const XLSX = require('xlsx');
const async = require('async');
const excelSchema = require('./model/schema');

var connectDB = require('./controller/db');

var upload = require('./controller/multer');

connectDB();

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/', upload.single('excel'), async (req, res) => {
  try {
    var workbook = XLSX.readFile(req.file.path);
    var sheet_namelist = workbook.SheetNames;
    var x = 0;
    var count = 0;

    async.eachSeries(sheet_namelist, function (sheet_name, callback) {
      var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name]);

      async.eachSeries(xlData, function (data, innerCallback) {
        excelSchema.findOne({ name: data.name, email: data.email, no: data.no }, async function (err, result) {
          if (err) {
            console.log(err);
            return innerCallback(err);
          }
          if (result) {
            console.log("duplicate Data Found");
            return innerCallback("Data Already exist ");
          } else {
            await excelSchema.create(data);
          }
          count++;
          innerCallback();
        });
      }, function (err) {
        if (err) {
          console.log(err);
          return callback(err);
        }
        x++;
        callback();
      });
    }, function (err) {
      if (err) {
        console.log(err);
        res.render("home", { errorMessage: err });
      } else {
        console.log("data submitted")
        res.render("thank");
      }
    });
  } catch (err) {
    console.log(err);
    res.render("home", { errorMessage: "Error occurred while processing data" });
  }
});
var port = process.env.PORT || 3000;
app.listen(port, () => console.log('server run at ' + port));
