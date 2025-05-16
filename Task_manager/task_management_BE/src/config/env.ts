import { config } from "dotenv";
import path from "path";

function initConfig() {
  const env = process.env.NODE_ENV || "dev";
  const envFile = env === "prod" ? ".env" : `.env.${env}`;
  const envPath = path.resolve(process.cwd(), envFile);
  console.log(`Loading environment variables from: ${envPath}`);
  config({ path: envPath });
}

initConfig();

export const ENV = {
  PORT: process.env.PORT,
  DB: {
    DB_URL: String(process.env.DB_URL),
  },
  JWT: {
    JWT_SECRET: String(process.env.JWT_SECRET),
    JWT_ACCESSTOKENTIME: String(process.env.JWT_ACCESSTOKENTIME),
    JWT_REFRESHACCESSTOKENTIME: String(process.env.JWT_REFRESHACCESSTOKENTIME),
  },
  SALT_WORK_FACTOR: process.env.SALT_WORK_FACTOR,
  DEFAULT_TIMEZONE: process.env.DEFAULT_TIMEZONE,
  DATE_FORMAT: process.env.DATE_FORMAT,
  DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE,
  ORIGIN: process.env.ORIGIN,
};
