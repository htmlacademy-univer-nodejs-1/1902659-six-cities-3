import convict from "convict";

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
};

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: "Port to bind",
    format: "port",
    env: "PORT",
    default: 4000,
  },
  SALT: {
    doc: "Salt for bcrypt",
    format: String,
    default: null,
    env: "SALT",
  },
  DB_HOST: {
    doc: "Database host",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "DB_HOST",
  },
  DB_USER: {
    doc: "username to connect to database",
    format: String,
    env: "DB_USER",
    default: null,
  },
  DB_PASSWORD: {
    doc: "password to connect",
    format: String,
    env: "DB_PASSWORD",
    default: null,
  },
  DB_PORT: {
    doc: "Database port",
    format: "port",
    default: "27017",
    env: "DB_PORT",
  },
  DB_NAME: {
    doc: "Database name",
    format: String,
    env: "DB_NAME",
    default: "six-cities",
  },
  UPLOAD_DIRECTORY: {
    doc: "Directory for upload files",
    format: String,
    env: "UPLOAD_DIRECTORY",
    default: null,
  },
});
