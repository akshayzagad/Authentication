import dotenv from "dotenv";

dotenv.config();
if (!process.env.MONGO_URI) {
    throw new Error("There no mongo uri in envirmental file")
}

if(!process.env.JWT_SECRET) {
    throw new Error("There is no jwt secret in envirmental file")
}

if(!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("There is no google client id in envirmental file")
}

if(!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("There is no google client secret in envirmental file")
}

if(!process.env.REFRESH_TOKEN) {
    throw new Error("There is no refresh token in envirmental file")
}

if(!process.env.ACCESS_TOKEN) {
    throw new Error("There is no access token in envirmental file")
}

if(!process.env.GOOGLE_USER) {
    throw new Error("There is no google user in envirmental file")
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  GOOGLE_USER: process.env.GOOGLE_USER,
};

export default config;
