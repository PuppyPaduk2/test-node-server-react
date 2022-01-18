export function getSide(): "browser" | "node" {
  return typeof window === "undefined" ? "node" : "browser";
}
