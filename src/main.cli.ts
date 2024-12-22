#!/usr/bin/env node
import CLIApplication from "./app/cli.js";
import GenerateCommand from "./cli-command/generate-comand.js";
import HelpCommand from "./cli-command/help-command.js";
import ImportCommand from "./cli-command/import-command.js";
import VersionCommand from "./cli-command/version-command.js";

function start() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);
  cliApplication.processComand(process.argv);
}

start();
