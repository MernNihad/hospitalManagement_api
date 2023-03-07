const db = require("../connection");
const { ObjectId } = require("mongodb");
const { USER_COLLECTION } = require("../collections/collections");
const errorHandler = require("../../middleware/user/userErrorHandle");
const { append } = require("express/lib/response");
const objectId = new ObjectId();

module.exports = {
  Signup: (userData,err) => {
    let obj = {};
    return new Promise((resolve, reject) => {
      db.collection(USER_COLLECTION).findOne({ email: userData.email }).then((FindEmail) => {
        // check email is already available here database
          if (FindEmail == null) {
            db.collection(USER_COLLECTION).insertOne(userData).then(async (response) => {
                db.collection(USER_COLLECTION).findOne({ _id: response.insertedId }).then(data => { obj.data = data; obj.loggedStatus = true; 
                    resolve(obj);
                  });
              }).catch( error => {
                obj.error = error;
                obj.errorStatus = true;
                reject(obj);
              });
          } else {
            obj.message = "Email already available";
            obj.loggedStatus = false;
            resolve(obj);
          }
        });
    });
  },
  Login: (userData) => {
    let obj = {};
    return new Promise((resolve, reject) => {
      db.collection(USER_COLLECTION).findOne({ email: userData.email }).then(async (response) => {
          // check email
          console.log(response,'check email available here');
          if (response == null) {
            // email wrong
            (obj.error = true), (obj.message = "email not found"), resolve(obj);
            // ----------
          } else {
            // email is true
            db.collection(USER_COLLECTION).findOne({ password: userData.password }).then((data) => {
                // check passowrd
                if (data == null)
                  // passowrd wrong
                  (obj.error = true),
                    (obj.message = "password not found"),
                    resolve(obj);
                // ------------
                // password true
                else
                  (obj.error = false),
                    (obj.login = true),
                    (obj.message = "Successfully logged"),
                    (obj.userData = data),
                    resolve(obj);
                // --------
              })
              .catch((err) => {
                reject(err);
              });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
