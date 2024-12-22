import chalk from "chalk";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { CLiCommand } from "./cli-command.interface.js";
export class VersionCommand implements CLiCommand {
  public readonly name = "--version";

  private readVersion(): string {
    const jsonContent = readFileSync(resolve("./package.json"), "utf-8");
    const importedContent = JSON.parse(jsonContent);

    return importedContent.version;
  }

  public async execute(): Promise<void> {
    const version = this.readVersion();
    console.log(chalk.blue.bold(version));
  }
}
