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

class CausalityClient {
  private baseURL: string;
  private defaultHeaders: Headers;

  constructor(defaultHeaders: Headers = {}) {
    this.baseURL = "https://causality.xyz"; // causality base url
    this.defaultHeaders = defaultHeaders;
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

  public async requestQrCode(
    params: RequestQrCodeParams
  ): Promise<RequestQrCodeResponse> {
    const response = await this.post("/requestQrCode", params);
    return response as RequestQrCodeResponse;
  }
}

export default CausalityClient;
