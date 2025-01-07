type Headers = Record<string, string>;

interface RequestOptions extends RequestInit {
  headers?: Headers;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  causality_key: string;
  causality_token: string;
  nickname: string;
}

export class PlateshareBackendClient {
  private baseURL: string;
  private defaultHeaders: Headers;

  constructor(defaultHeaders: Headers = {}) {
    this.baseURL =
      "https://plateshare-backend-c2qf2mw87-julian-januszkas-projects.vercel.app"; // todo: load in from env var or something
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

  public async login(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    let params: LoginRequest = {
      username: username,
      password: password,
    };
    const response = await this.post("/api/login", params);
    return response as LoginResponse;
  }
}
