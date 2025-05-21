const mongoose = require("mongoose")
const config = require("./config/config.json")

const dbConnection = async () => {
    try {
        await mongoose.connect(config.dev.MONGO_URI)
        console.log("Conexión a la base de datos establecida");
    } catch (error) {
        console.log(error);
        throw new Error("Error al conectarse a la base de datos")
    }
}

module.exports = { dbConnection }

