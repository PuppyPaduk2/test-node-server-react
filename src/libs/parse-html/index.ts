export type HtmlChunks<
  K extends string
> = {
  [Key in K]: string;
} & {
  end: string;
}

export function createParseHtml<
  K extends string = string
>(
  chunks: Record<K, string>
): (html: string) => HtmlChunks<K> {
  return function parseHtml(html) {
    const entries = Object.entries<string>(chunks);
    let current = html;
    const result = {} as HtmlChunks<K>;

    for (let index = 0; index < entries.length; index += 1) {
      const [key, splitter] = entries[index];
      const arr = current.split(splitter);

      if (arr.length <= 2) {
        (result as any)[key] = arr[0] ?? "";
        current = arr[1] ?? "";
      } else {
        throw `Incorrect splitter (${splitter}). It is not uniq.`;
      }
    }

    result.end = current;

    return result;
  }
}

// const parseHtml = createParseHtml({
//   beforeHead: "{{head}}",
//   beforeContent: "{{content}}",
//   beforeFooter: "{{footer}}",
// });

// parseHtml("")
