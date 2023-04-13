const { connectMongo, getConnection } = require("../config/config");

const DB_NAME = 'hospitalManagement';
const COLLECTION_NAME = 'admin';

const getAdminCollection = () => getConnection().db(DB_NAME).collection(COLLECTION_NAME)

module.exports = {

    getSingleAdmin: async (criteria) => {
        return getAdminCollection().findOne(criteria)
        
    },
    updateSingleAdmin: async (...user) => {
        console.log(user,'user');
        return getAdminCollection().updateOne(...user);
    },
    


}
