export interface CLiCommand {
  readonly name: string;

  execute(...paramers: string[]): void;
}
