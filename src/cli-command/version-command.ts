import { readFileSync } from "node:fs";
import { CLiCommand } from "./cli-command.interface.js";
import chalk from "chalk";

export default class VersionCommand implements CLiCommand {
  public readonly name = "--version";

  public readVersion(): string {
    const data = readFileSync("../package.json", "utf-8");
    const content = JSON.parse(data);
    return content.version;
  }

  public async execute(): Promise<void> {
    const version = this.readVersion();
    console.log(`${chalk.cyanBright(version)}`);
  }
}
