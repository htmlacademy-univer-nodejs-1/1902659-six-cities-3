export interface fileWriterInterface {
  readonly filename: string;
  write(row: string): void;
}
