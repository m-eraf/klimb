var mongoose  =  require('mongoose');  
   
var Schema = new mongoose.Schema({
    "Name of the Candidate": { type: String },
    "Email": { type: String, unique: true },
    "Mobile No.": { type: Number },
    "Date of Birth": { type: String },
    "Work Experience": { type: String },
    "Resume Title": { type: String },
    "Current Location": { type: String },
    "Postal Address": { type: String },
    "Current Employer": { type: String },
    "Current Designation": { type: String }
  });
   
module.exports = mongoose.model('schema',Schema);  