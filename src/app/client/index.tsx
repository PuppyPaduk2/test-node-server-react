import { attachClientApp } from "libs/infra-app";
import { App } from "./app";

attachClientApp({
  selector: "#root",
  App,
});
