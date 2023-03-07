const mongoose = require('mongoose');


let url = 'mongodb://localhost:27017/mongooseConnect';
let dbname = ''
// let url = `${route}/${dbname}`
mongoose.connect(url,{
    useNewUrlParser: true,
})

const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports = db