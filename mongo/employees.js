const { default: mongoose } = require("mongoose");
const { connectMongo, getConnection } = require("../config/config");
const mongo = require("mongodb");
// var OBJECT_ID = new ObjectId()

const DB_NAME = 'hospitalManagement';
const COLLECTION_NAME = 'employees';

const getDepartmentCollection = () => getConnection().db(DB_NAME).collection(COLLECTION_NAME)

module.exports = {
    createSingleEmployees: async (criteria, name) => {
        let result = await getDepartmentCollection().findOne(name)
        if (result === null) {
            return getDepartmentCollection().insertOne(criteria)
        } else {

            let obj = {
                message: 'The name is already available.',
                name_available: true
            }
            return obj
        }
    },
    getAllEmployees: async () => {
        return getDepartmentCollection().find().toArray()

    },
    getSingleEmployees: async (criteria) => {
        return getDepartmentCollection().findOne(criteria)

    },
    updateSingleEmployees: async (...criteria) => {
         return getDepartmentCollection().updateOne(...criteria);
    },
    deleteSingleEmployees: async (...criteria) => {
        return getDepartmentCollection().deleteOne(...criteria);
   },



}
