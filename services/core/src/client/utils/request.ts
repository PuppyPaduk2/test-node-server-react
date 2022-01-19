import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

declare const __APP_URL__: string;
const APP_URL: string = __APP_URL__;

export type RequestPromise<Result> = AxiosPromise<Result>;

export function request<Result = unknown, Data = unknown>(config: AxiosRequestConfig<Data>): RequestPromise<Result> {
  return axios({
    ...config,
    url: `${APP_URL}${config.url}`,
  });
}
