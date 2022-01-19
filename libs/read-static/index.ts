import { Readable } from "stream";
import { createReadStream, existsSync } from "fs";

const cache: Record<string, (Buffer | string)[]> = {};

export function readStatic(path: string): Readable | null {
  if (cache[path]) {
    return new Readable({
      read() {
        cache[path].forEach((chunk) => this.push(chunk));
        this.push(null);
      },
    });
  } else if (existsSync(path)) {
    const stream = createReadStream(path);

    cache[path] = [];
    stream.on("data", (chunk) => cache[path].push(chunk));

    return stream;
  } else {
    return null;
  }
}