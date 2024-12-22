import { createWriteStream, WriteStream } from "node:fs";
import { fileWriterInterface } from "./file-writer.interface";

export default class TSVFileWriter implements fileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly filename: string) {
    this.stream = createWriteStream(this.filename, {
      flags: "w",
      encoding: "utf-8",
      highWaterMark: 2 ** 16,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    if (this.stream.write(`${row}\n`)) {
      return Promise.resolve();
    } else {
      return new Promise((resolve) => {
        this.stream.once("drain", () => resolve());
      });
    }
  }
}
