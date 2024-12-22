import chalk from "chalk";
import TSVFileReader from "../file-reader/file-reader.js";
import { getErrorMessage } from "../utils/common.js";
import { CLiCommand } from "./cli-command.interface.js";
import { createOffer } from "../utils/offer.js";

export default class ImportCommand implements CLiCommand {
  public readonly name: string = "--import";

  private onLine(line: string): void {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(
      `${chalk.greenBright(`Успешно импортировано ${count} строк.`)}`
    );
  }

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on("row", this.onLine);
    fileReader.on("end", this.onComplete);

    try {
      await fileReader.read();
    } catch (error) {
      console.log(
        `${chalk.redBright(`Нельзя прочитать файл: ${getErrorMessage(error)}`)}`
      );
    }
  }
}
