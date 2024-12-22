import { CLiCommand } from "./cli-command.interface.js";
import chalk from "chalk";
import pkg from "../../package.json" assert { type: "json" };

export default class VersionCommand implements CLiCommand {
  public readonly name = "--version";

  public readVersion(): string {
    return pkg.version;
  }

  public async execute(): Promise<void> {
    const version = this.readVersion();
    console.log(`${chalk.cyanBright(version)}`);
  }
}
