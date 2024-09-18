interface HttpRequestStrategy {
  execute<T>(url: string, data?: any): Promise<T>;
}

export class GetHttpRequestStrategy implements HttpRequestStrategy {
  async execute<T>(url: string): Promise<T> {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      let data: T | { message?: string };

      try {
        data = await res.json();
      } catch (jsonError) {
        throw new Error("Failed to parse response as JSON");
      }

      if (!res.ok) {
        const errorMessage =
          (data as { message?: string }).message || "An error occurred";
        console.error("Request:", errorMessage);
      }

      return data as T;
    } catch (error) {
      console.error("Request failed:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }
}

export class PostHttpRequestStrategy implements HttpRequestStrategy {
  async execute<T>(url: string, data: any): Promise<T> {
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
          (dat as { message?: string }).message || "An error occurred",
        );

      return dat as T;
    } catch (error) {
      console.error("Request failed:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }
}

export class PatchHttpRequestStrategy implements HttpRequestStrategy {
  async execute<T>(url: string, data: object): Promise<T> {
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
          (dat as { message?: string }).message || "An error occurred",
        );

      return dat as T;
    } catch (error) {
      console.error("Request failed:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }
}

export class DeleteHttpRequestStrategy implements HttpRequestStrategy {
  async execute<T>(url: string): Promise<T> {
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
          (dat as { message?: string }).message || "An error occurred",
        );

      return dat as T;
    } catch (error) {
      console.error("Request failed:", error);
      throw error instanceof Error ? error : new Error(String(error));
    }
  }
}

export class HttpRequestContext {
  private strategy: HttpRequestStrategy;

  constructor(strategy: HttpRequestStrategy) {
    this.strategy = strategy;
  }

  async executeRequest<T>(url: string, data?: any): Promise<T> {
    return this.strategy.execute(url, data);
  }
}
