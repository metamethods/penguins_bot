import { glob } from "glob";
import { join } from "path";

import toUNIX from "@utility/toUNIX";

import type { ImportOptions, GlobOptions } from "@typings/file";

export default class File {
  public file: string;
  public name: string;

  constructor(file: string) {
    this.file = file;
    this.name = toUNIX(file).split("/").pop()!;
  }

  public static async glob(pattern: string, options: GlobOptions = {}): Promise<File[]> {
    if (options.useSrcDirectory)
      pattern = join(require.main?.path ?? "", pattern);

    return (await glob(toUNIX(pattern), {
      absolute: true
    })).map(file => new File(file));
  }

  public async import<IImport>(options: ImportOptions = {}): Promise<IImport> {
    if (options.clearCache)
      delete require.cache[require.resolve(this.file)];

    const imported = await import(this.file);

    return options.default ? imported.default : imported;
  }
}