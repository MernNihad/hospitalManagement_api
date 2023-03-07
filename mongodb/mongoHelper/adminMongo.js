const db = require("../connection");
const { ObjectId } = require("mongodb");
const { ADMIN_COLLECTION } = require("../collections/collections");
const objectId = new ObjectId();

module.exports = {
    Login: (userData) => {
        let obj = {};
        return new Promise((resolve, reject) => {
          db.collection(ADMIN_COLLECTION)
            .findOne({ email: userData.email })
            .then(async (response) => {
              // check email
              if (response == null) {
                // email wrong
                (obj.error = true), (obj.message = "email not found"), resolve(obj);
                // ----------
              } else {
                // email is true
                db.collection(ADMIN_COLLECTION)
                  .findOne({ password: userData.password })
                  .then((data) => {
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
