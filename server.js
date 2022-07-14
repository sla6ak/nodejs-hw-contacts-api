const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { MONGO_DB } = process.env;
const PORT = process.env.PORT || 5000;

(() => {
    try {
        app.listen(PORT, () => {
            console.log(`server start on port = ${PORT}`);
        });
        mongoose.connect(MONGO_DB).then(() => {
            console.log(`mongoDB connection successful`);
        });
    } catch (error) {
        process.exit(1);
    }
})();

// https://localhost:5000/
