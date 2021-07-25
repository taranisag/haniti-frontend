// eslint-disable-next-line
import axios from "axios";
import { stringify } from "query-string";
import mergeWith from "lodash.mergewith";

const apiUrl = "https://haniti-3aeed.appspot.com";

export interface ISettings {
  headers?: { [key: string]: string | undefined };
}

export class ApiServices {
  private _settings: ISettings;

  constructor(settings = {}) {
    this._settings = settings;
  }

  get settings() {
    return this._settings;
  }

  private parseEndpoint(
    endpoint: string,
    params: undefined | { [key: string]: any },
    $$endpoint: undefined | { [key: string]: any }
  ) {
    let url = endpoint.indexOf("http") === 0 ? endpoint : apiUrl + endpoint;
    const querystring = params ? `?${stringify(params)}` : "";

    if ($$endpoint) {
      url = url.replace(apiUrl, $$endpoint.forceApiUrl ?? apiUrl);
    }

    return `${url}${querystring}`;
  }

  private parseSettings({
    method = "get",
    data,
    locale,
    ...otherSettings
  }: any) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const settings = mergeWith(
      {
        data,
        method,
        headers,
      },
      otherSettings
    );

    return settings;
  }

  public setToken(token: string) {
    this._settings.headers = {
      ...this._settings.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  public unsetToken() {
    this._settings.headers = {
      ...this._settings.headers,
      Authorization: undefined,
    };
  }

  public request<T>(
    endpoint: string,
    { params, $$endpoint, ...settings }: { [key: string]: any } = {}
  ): Promise<any> {
    return axios(
      this.parseEndpoint(endpoint, params, $$endpoint),
      this.parseSettings(mergeWith({}, this.settings, settings))
    ).catch((err) => {
      const { response } = err;
      const error = new Error(`${response.status} ${response.statusText}`);

      // @ts-ignore
      error.response = response;
      throw error;
    });
  }

  public get<T>(endpoint: string, settings?: { [key: string]: any }) {
    return this.request(endpoint, { method: "get", ...settings });
  }

  public delete<T>(endpoint: string, settings?: { [key: string]: any }) {
    return this.request(endpoint, { method: "delete", ...settings });
  }

  public post(endpoint: string, data = {}, settings?: { [key: string]: any }) {
    return this.request(endpoint, { method: "post", data, ...settings });
  }

  public put(endpoint: string, data = {}, settings?: { [key: string]: any }) {
    return this.request(endpoint, { method: "put", data, ...settings });
  }

  public patch(endpoint: string, data = {}, settings?: { [key: string]: any }) {
    return this.request(endpoint, { method: "patch", data, ...settings });
  }
}
export const app = new ApiServices();
