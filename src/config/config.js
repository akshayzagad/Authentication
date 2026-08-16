import dotenv from "dotenv";

dotenv.config();
if (!process.env.MONGO_URI) {
    throw new Error("There no mongo uri in envirmental file")
}
if(!process.env.jwt_secret) {
    throw new Error("There is no jwt secret in envirmental file")
}
const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default config;
