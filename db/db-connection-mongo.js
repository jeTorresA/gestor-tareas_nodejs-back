const mongoose = require('mongoose');
const { userData } = require('../config');


const getConnection = async () => {

    try{
        //here put your connection string. in the readme file I explain how to generate it
        const url = `mongodb://${userData.user}:${userData.password}@ac-8jfgow2-shard-00-00.iz9gls4.mongodb.net:27017,ac-8jfgow2-shard-00-01.iz9gls4.mongodb.net:27017,ac-8jfgow2-shard-00-02.iz9gls4.mongodb.net:27017/${userData.dbname}?ssl=true&replicaSet=atlas-q0nusu-shard-0&authSource=admin&retryWrites=true&w=majority`;

        await mongoose.connect(url);

        console.log("Conexión Exitosa!!!");
        
    }catch (error){
        console.log(error);
    }

}

module.exports = {getConnection,};

