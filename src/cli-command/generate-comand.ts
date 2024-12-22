import chalk from "chalk";
import TSVFileWriter from "../file-writer/file-writer.js";
import OfferGenerator from "../modules/offer-generator.js";
import { MockData } from "../types/mock-data.type.js";
import { getErrorMessage } from "../utils/common.js";
import { CLiCommand } from "./cli-command.interface.js";

export default class GenerateCommand implements CLiCommand {
  public readonly name: string = "--generate";
  private initialState!: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = parseInt(count, 10);

    try {
      const res = await fetch(url);
      this.initialState = await res.json();
    } catch (error) {
      console.log(getErrorMessage(error));
    }

    const offerGenerator = new OfferGenerator(this.initialState);
    const fileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await fileWriter.write(offerGenerator.generate());
    }

    console.log(`${chalk.greenBright(`Файл ${filepath} успешно создан`)}`);
  }
}
