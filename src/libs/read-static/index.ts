import { Readable } from "stream";
import { createReadStream, existsSync } from "fs";

const cache: Record<string, (Buffer | string)[]> = {};

type Options = {
  useCache?: boolean;
};

export function readStatic(path: string, options: Options = {}): Readable | null {
  const useCache = options.useCache ?? true;

  if (cache[path] && useCache) {
    return new Readable({
      read() {
        cache[path].forEach((chunk) => this.push(chunk));
        this.push(null);
      },
    });
  } else if (existsSync(path)) {
    const stream = createReadStream(path);

    if (useCache) {
      cache[path] = [];
      stream.on("data", (chunk) => cache[path].push(chunk));
    }

    return stream;
  } else {
    return null;
  }
}