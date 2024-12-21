import CLIApplication from "./app/cli.js";
import HelpCommand from "./cli-command/help-command.js";
import ImportCommand from "./cli-command/import-command.js";
import VersionCommand from "./cli-command/version-command.js";

const cliApplication = new CLIApplication();
cliApplication.registerCommands([
  new HelpCommand(),
  new VersionCommand(),
  new ImportCommand(),
]);
cliApplication.processComand(process.argv);
