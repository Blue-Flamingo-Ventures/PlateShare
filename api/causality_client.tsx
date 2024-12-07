import { act } from "react";

type Headers = Record<string, string>;

interface RequestOptions extends RequestInit {
  headers?: Headers;
}

interface RequestQrCodeParams {
  key: string;
  token: string;
  browsers?: string;
}

interface RequestQrCodeResponse {
  status: number;
  qrCodeLink?: string;
  qrcode?: string;
  deeplink?: string;
  message?: string;
}

interface ApiStatusCheckParams {
  code: string
}

interface ApiStatusCheckResponse {
  message: string;
  nfc_tag: string;
  chip_type: string;
  product_id: string;
  product_name: string;
  status: number;
}

interface ClearUidsRequest {
  key: string;
  token: string;
  action: string;
}

interface ClearUidsResponse {
  message: string,
  status: string,
}

class CausalityClient {
  private baseURL: string;
  private defaultHeaders: Headers;
  private token: string;
  private key: string;

  constructor(defaultHeaders: Headers = {}, key: string, token: string) {
    this.baseURL = "https://causality.xyz/api"; // causality base url
    this.defaultHeaders = defaultHeaders;
    this.token = token;
    this.key = key;
  }

  // Set a specific header
  setHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }

  // Remove a specific header
  removeHeader(key: string): void {
    delete this.defaultHeaders[key];
  }

  // Private method to make the actual fetch call
  private async _fetch(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = { ...this.defaultHeaders, ...options.headers };

    const config: RequestOptions = {
      ...options,
      headers,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {}
      throw new Error(errorMessage);
    }

    return response.json();
  }

  private async get(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<any> {
    return this._fetch(endpoint, { ...options, method: "GET" });
  }

  private async post(
    endpoint: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<any> {
    return this._fetch(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  private async put(
    endpoint: string,
    body: unknown,
    options: RequestOptions = {}
  ): Promise<any> {
    return this._fetch(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  private async delete(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<any> {
    return this._fetch(endpoint, { ...options, method: "DELETE" });
  }

  public async requestQrCode(): Promise<RequestQrCodeResponse> {
    let params: RequestQrCodeParams = {
      key: this.key,
      token: this.token
    }
    const response = await this.post("/requestQrCode", params);
    return response as RequestQrCodeResponse;
  }

  public async apiStatusCheck(
    params: ApiStatusCheckParams
  ): Promise<ApiStatusCheckResponse> {
    const response = await this.post("/apiStatusCheck", params);
    return response as ApiStatusCheckResponse;
  }

  public async clearUids(): Promise<ClearUidsResponse> {
    let params: ClearUidsRequest = {
      key: this.key,
      token: this.token,
      action: "remove"
    }
    const response = await this.post("/clear_uids", params);
    return response as ClearUidsResponse;
  }

  
}

export default CausalityClient;
