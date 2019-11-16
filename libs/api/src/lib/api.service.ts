import { ApiResponse } from './api.service';
import { Injectable, Inject } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { BaseApiConfig, HeadersConfig } from './api-config.interface';
import { ApiConfig } from './api-config.token';
import { trimStartSlash, trimEndSlash } from './utils';



export function sanitizeConfig(apiConfig: BaseApiConfig): BaseApiConfig {
  return { ...apiConfig, baseUrl: trimEndSlash(apiConfig.baseUrl) }
}

export const anyPropertyIsNotAllowedMsg =
  'Type argument for response type is required';
type TypeArgumentIsRequired = typeof anyPropertyIsNotAllowedMsg;

export type ApiResponse<R> = R extends (true | false)
  ? Observable<boolean>
  : R extends number
  ? Observable<number>
  : R extends string
  ? Observable<string>
  : R extends object
  ? Observable<R>
  : TypeArgumentIsRequired;

@Injectable()
export class ApiService {

  private config: BaseApiConfig;

  constructor(
    private http: HttpClient,
    @Inject(ApiConfig) config: BaseApiConfig
  ) {
    this.config = sanitizeConfig(config);
  }

  private headersFactory(headers?: HeadersConfig): HttpHeaders {
    const headersConfig = {
      ...(this.config.headers ? this.config.headers : {}),
      ...(headers ? headers : {})
    };

    return new HttpHeaders(headersConfig);
  }

  private formatError(error: HttpErrorResponse) {
    // return an observable with a user-facing error
    return throwError(error.error);
  }

  get(
    url: string,
    params?: HttpParams,
    headers?: HeadersConfig
  ): Observable<TypeArgumentIsRequired>;
  get<T>(
    url: string,
    params?: HttpParams,
    headers?: HeadersConfig
  ): ApiResponse<T>;
  get<T>(
    url: string,
    params: HttpParams = new HttpParams(),
    headers: HeadersConfig = {}
  ): Observable<T> {
    return this.http
      .get<T>(
        `${this.config.baseUrl}/${trimStartSlash(url)}`,
        {
          params,
          headers: this.headersFactory(headers)
        }
      )
     .pipe(
        catchError(this.formatError)
      );
  }

  post(
    url: string,
    body?: any,
    headers?: HeadersConfig
  ): Observable<TypeArgumentIsRequired>;
  post<T>(url: string, body?: any, headers?: HeadersConfig): ApiResponse<T>;
  post<T>(url: string, body?: any, headers?: HeadersConfig): Observable<T> {
    return this.http
      .post<T>(
        `${this.config.baseUrl}/${trimStartSlash(url)}`,
        body,
        {
          headers: this.headersFactory(headers)
        }
      )
     .pipe(catchError(this.formatError)
      );
  }

  put(
    url: string,
    body?: any,
    headers?: HeadersConfig
  ): Observable<TypeArgumentIsRequired>;
  put<T>(url: string, body?: any, headers?: HeadersConfig): ApiResponse<T>;
  put<T>(url: string, body?: any, headers?: HeadersConfig): Observable<T> {
    return this.http
      .put<T>(
        `${this.config.baseUrl}/${trimStartSlash(url)}`,
        body,
        {
          headers: this.headersFactory(headers)
        }
      )
     .pipe(catchError(this.formatError)
      );
  }

  patch(
    url: string,
    body?: any,
    headers?: HeadersConfig
  ): Observable<TypeArgumentIsRequired>;
  patch<T>(url: string, body?: any, headers?: HeadersConfig): ApiResponse<T>;
  patch<T>(url: string, body?: any, headers?: HeadersConfig): Observable<T> {
    return this.http
      .patch<T>(
        `${this.config.baseUrl}/${trimStartSlash(url)}`,
        body,
        {
          headers: this.headersFactory(headers)
        }
      )
     .pipe(
        catchError(this.formatError)
      );
  }

  delete(
    url: string,
    headers?: HeadersConfig
  ): Observable<TypeArgumentIsRequired>;
  delete<T>(url: string, headers?: HeadersConfig): ApiResponse<T>;
  delete<T>(url: string, headers?: HeadersConfig): Observable<T> {
    return this.http
      .delete<T>(
        `${this.config.baseUrl}/${trimStartSlash(url)}`,
        {
          headers: this.headersFactory(headers)
        }
      )
     .pipe(
        catchError(this.formatError)
      );
  }

  head(
    url: string,
    params?: HttpParams,
    headers?: HeadersConfig
  ): Observable<TypeArgumentIsRequired>;
  head<T>(
    url: string,
    params?: HttpParams,
    headers?: HeadersConfig
  ): ApiResponse<T>;
  head<T>(
    url: string,
    params: HttpParams = new HttpParams(),
    headers: HeadersConfig = {}
  ): Observable<T> {
    return this.http
      .head<T>(
        `${this.config.baseUrl}/${trimStartSlash(url)}`,
        {
          params,
          headers: this.headersFactory(headers)
        }
      )
     .pipe(
        catchError(this.formatError)
      );
  }

  options(
    url: string,
    params?: HttpParams,
    headers?: HeadersConfig
  ): Observable<TypeArgumentIsRequired>;
  options<T>(
    url: string,
    params: HttpParams,
    headers: HeadersConfig
  ): ApiResponse<T>;
  options<T>(
    url: string,
    params: HttpParams = new HttpParams(),
    headers: HeadersConfig = {}
  ): Observable<T> {
    return this.http
      .options<T>(
        `${this.config.baseUrl}/${trimStartSlash(url)}`,
        {
          params,
          headers: this.headersFactory(headers)
        }
      )
     .pipe(
        catchError(this.formatError)
      );
  }
}
