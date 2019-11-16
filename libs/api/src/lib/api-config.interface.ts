export interface BaseApiConfig {
  baseUrl: string
}

export type HeadersConfig = { [ header: string ]: string };
export interface BaseApiConfig {
  baseUrl: string
  headers?: HeadersConfig
}
