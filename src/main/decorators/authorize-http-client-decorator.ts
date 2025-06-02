import { HttpClient, HttpRequest, HttpResponse } from "@/data/http"

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(private readonly httpClient: HttpClient, private readonly accessToken?: string) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    if (this.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          Authorization: `Bearer ${this.accessToken}` // 🔹 Usa Bearer Token passado na instância
        })
      })
    }

    return this.httpClient.request(data)
  }
}
