import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

declare const __SERVICE_URL__: string;
const SERVICE_URL: string = __SERVICE_URL__;

export type RequestPromise<Result> = AxiosPromise<Result>;

export function request<Result = unknown, Data = unknown>(config: AxiosRequestConfig<Data>): RequestPromise<Result> {
  return axios({
    ...config,
    url: `${SERVICE_URL}${config.url}`,
  });
}
