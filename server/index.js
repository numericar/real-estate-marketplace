import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import ENVIRONMENT_ENUM from "./configs/enums/environmentEnum.js";

const ENV_TYPE = ENVIRONMENT_ENUM.PRODUCTION
const ENVIRONMENT_FILE = getEnvironment(ENV_TYPE);

dotenv.config({
    path: path.join(path.resolve(), ENVIRONMENT_FILE)
});

const mongoConnectionString = process.env.MONGO_DB_URL;
mongoose.connect(mongoConnectionString).then(() => {
    console.log("Connection successful");
}).catch(error => console.error(error));

const app = express();

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

function getEnvironment(envType) {
    switch (envType) {
        case ENVIRONMENT_ENUM.DEVELOPMENT:
            return ".env.development.local";
        case ENVIRONMENT_ENUM.TESTING:
            return ".env";
        case ENVIRONMENT_ENUM.PRE_PRODUCTION:
            return ".env";
        case ENVIRONMENT_ENUM.PRODUCTION:
            return ".env"
    }
}