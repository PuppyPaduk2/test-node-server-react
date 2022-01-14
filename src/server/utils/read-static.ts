import { Readable } from "stream";
import { createReadStream, existsSync, ReadStream } from "fs";
import { resolve as resolvePath } from "path";

const cache: Record<string, (Buffer | string)[]> = {};

export function readStatic(path: string): Readable | null {
  const fullPath = resolvePath(__dirname, "../client", path);

  if (cache[fullPath]) {
    return new Readable({
      read() {
        cache[fullPath].forEach((chunk) => this.push(chunk));
        this.push(null);
      },
    });
  } else if (existsSync(fullPath)) {
    const stream = createReadStream(fullPath);

    cache[fullPath] = [];
    stream.on("data", (chunk) => cache[fullPath].push(chunk));

    return stream;
  } else {
    return null;
  }
}