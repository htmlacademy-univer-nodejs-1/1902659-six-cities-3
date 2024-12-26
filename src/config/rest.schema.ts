import convict from "convict";

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
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
});
