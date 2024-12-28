import { inject, injectable } from "inversify";
import { DatabaseClient } from "./database-client.interface.js";
import mongoose, { Mongoose } from "mongoose";
import { Component } from "../types/component.enum.js";
import { Logger } from "../logger/logger.interface.js";
import { setTimeout } from "node:timers/promises";
import { P } from "pino";

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export default class MongoClientService implements DatabaseClient {
  private isConnected = false;
  private mongoseInstance: Mongoose | null = null;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {}

  private async connectWithRetry(url: string): Promise<Mongoose> {
    let attempt = 0;

    while (attempt < RETRY_COUNT) {
      try {
        return await mongoose.connect(url);
      } catch (error) {
        attempt++;
        this.logger.error(
          `Попытка соединения номер ${attempt} провалена. Повтор...`
        );
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    this.logger.error(`Невозможно подключится после попытки ${attempt}`);
    throw new Error("Ошибка подключения к базе данных");
  }

  private async _connect(url: string): Promise<void> {
    this.mongoseInstance = await this.connectWithRetry(url);
    this.isConnected = true;
  }

  private async _disconnect(): Promise<void> {
    await this.mongoseInstance?.disconnect();
    this.isConnected = false;
    this.mongoseInstance = null;
  }

  public async connect(url: string): Promise<void> {
    if (this.isConnected) {
      throw new Error("Mongodb клиент успешно подключен");
    }
    this.logger.info("Попытка подключения к базе данных...");
    await this._connect(url);
    this.logger.info("Mongodb клиент успешно подключен");
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error("Нет подключения к базе данных");
    }
    await this._disconnect();
    this.logger.info("Подключение к базе данных отключено");
  }
}
