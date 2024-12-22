import got from "got";
import chalk from "chalk";
import { CLiCommand } from "./cli-command.interface.js";
import { MockData } from "../types/mock-data.type.js";
import OfferGenerator from "../modules/offer-generator.js";
import TSVFileWriter from "../file-writer/file-writer.js";

export class GenerateCommand implements CLiCommand {
  public readonly name = "--generate";
  private initialData!: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      console.error(chalk.red(`Can't fetch data from ${url}`));
      return;
    }

    const offerGeneratorString = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }

    console.log(`File ${filepath} was created`);
  }
}
