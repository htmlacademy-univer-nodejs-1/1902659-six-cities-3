import chalk from "chalk";
import TSVFileReader from "../file-reader/file-reader.js";
import { getErrorMessage } from "../utils/common.js";
import { CLiCommand } from "./cli-command.interface.js";

export default class ImportCommand implements CLiCommand {
  public readonly name: string = "--import";

  public execute(filename: string): void {
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.parseData());
    } catch (error) {
      console.log(
        `${chalk.redBright(`Нельзя прочитать файл: ${getErrorMessage(error)}`)}`
      );
    }
  }
}
