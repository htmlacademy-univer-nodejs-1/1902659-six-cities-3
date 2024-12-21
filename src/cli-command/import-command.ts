import { CLiCommand } from "./cli-command.interface.js";

export default class ImportCommand implements CLiCommand {
  public readonly name: string = "--import";

  public execute(filename: string): void {
    const fileReader = new TSVFileReader(filename.trim());
  }
}
