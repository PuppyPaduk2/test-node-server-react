import { readFileSync } from "fs";

type HtmlChunks = {
  origin: string;
  beforeHead: string;
  beforeContent: string;
  beforeFooter: string;
  afterFooter: string;
};

export function parseIndexHtml(path: string): HtmlChunks {
  const origin = readFileSync(path).toString();
  let htmlArray = origin.split("{{head}}");
  const beforeHead = htmlArray[0];

  htmlArray = htmlArray[1].split("{{content}}");
  const beforeContent = htmlArray[0];

  htmlArray = htmlArray[1].split("{{footer}}");
  const beforeFooter = htmlArray[0];
  const afterFooter = htmlArray[1];

  return { origin, beforeHead, beforeContent, beforeFooter, afterFooter };
}
