// import libraries
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";

// import enums
import ENVIRONMENT_ENUM from "./configs/enums/environmentEnum.js";

// import routes
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js";

// import middlewares
import { errorResponseHandler } from "./middlewares/error.middleware.js";

const ENV_TYPE = ENVIRONMENT_ENUM.PRODUCTION
const ENVIRONMENT_FILE_NAME = getEnvironmentFileName(ENV_TYPE);
const ENVIRONMENT_PATH = path.join(path.resolve(), ENVIRONMENT_FILE_NAME);

dotenv.config({
    path: ENVIRONMENT_PATH
});

const mongoConnectionString = process.env.MONGO_DB_URL;
mongoose.connect(mongoConnectionString).then(() => {
    console.log("Connection successful");
}).catch(error => console.error(error));

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auths", authRoutes);

app.use(errorResponseHandler);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

function getEnvironmentFileName(envType) {
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