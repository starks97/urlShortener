type ApiResponse<T> = T | Error;

interface HttpRequestStrategy {
  execute<T>(url: string, data?: any): Promise<ApiResponse<T>>;
}

export class GetHttpRequestStrategy implements HttpRequestStrategy {
  async execute<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // this is important for cookies to be sent for the request
      });

      const dat = (await res.json()) as T;

      if (!res.ok)
        throw new Error(
          (dat as { message?: string }).message || "An error occurred"
        );

      return dat as T;
    } catch (error) {
      console.error(error);
      throw error as Error;
    }
  }
}

export class PostHttpRequestStrategy implements HttpRequestStrategy {
  async execute<T>(url: string, data: any): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const dat = (await res.json()) as T;

      if (!res.ok)
        throw new Error(
          (dat as { message?: string }).message || "An error occurred"
        );

      return dat as T;
    } catch (error) {
      console.error(error);
      throw error as Error;
    }
  }
}

export class PatchHttpRequestStrategy implements HttpRequestStrategy {
  async execute<T>(url: string, data: object): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const dat = (await res.json()) as T;

      if (!res.ok)
        throw new Error(
          (dat as { message?: string }).message || "An error occurred"
        );

      return dat as T;
    } catch (error) {
      console.error(error);
      throw error as Error;
    }
  }
}

export class DeleteHttpRequestStrategy implements HttpRequestStrategy {
  async execute<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const dat = (await res.json()) as T;

      if (!res.ok)
        throw new Error(
          (dat as { message?: string }).message || "An error occurred"
        );

      return dat as T;
    } catch (error) {
      console.error(error);
      throw error as Error;
    }
  }
}

export class HttpRequestContext {
  private strategy: HttpRequestStrategy;

  constructor(strategy: HttpRequestStrategy) {
    this.strategy = strategy;
  }

  async executeRequest<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.strategy.execute(url, data);
  }
}
