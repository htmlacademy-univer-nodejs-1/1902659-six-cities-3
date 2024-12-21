import { CLiCommand } from "../cli-command/cli-command.interface.js";

type ParsedCommand = {
  [key: string]: string[];
};

export default class CLIApplication {
  private commands: { [propertyName: string]: CLiCommand } = {};
  private defaultCommand = "--help";

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = "";

    return cliArguments.reduce((acc, item) => {
      if (item.startsWith("--")) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }

      return acc;
    }, parsedCommand);
  }

  public getCommand(commandName: string): CLiCommand | undefined {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processComand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArgument = parsedCommand[commandName] ?? [];
    command?.execute(...commandArgument);
  }

  public registerCommands(commandList: CLiCommand[]): void {
    commandList.reduce((acc, command) => {
      const cliCommand = command;
      acc[cliCommand.name] = cliCommand;
      return acc;
    }, this.commands);
  }
}
