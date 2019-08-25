import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { BaseApiConfig } from './api-config.interface';
import { ApiConfig } from './api-config.token';


@Injectable( {
  providedIn: 'root'
} )
export class ApiService {

  constructor(
    private http: HttpClient,
    @Inject( ApiConfig ) private config: BaseApiConfig
  ) { }
  private formatErrors( error: any ) {
    return throwError( error.error );
  }

  public get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    return new HttpHeaders( headersConfig );
  }


  get<T>( url: string, params: HttpParams = new HttpParams() ): Observable<T> {
    return this.http.get<T>( `${this.config.baseUrl}${url}`, {
      params
    } ).pipe( catchError( this.formatErrors ) );
  }

  put<T>( url: string, body: any = {} ): Observable<any> {
    return this.http
      .put( `${this.config.baseUrl}${url}`, body, { headers: this.headers } )
      .pipe( catchError( this.formatErrors ) );
  }


  post<T>( url: string, body: any = {} ): Observable<any> {
    return this.http
      .post( `${this.config.baseUrl}${url}`, body, { headers: this.headers } )
      .pipe( catchError( this.formatErrors ) );
  }

  delete<T>( url: string ): Observable<any> {
    return this.http
      .delete( `${this.config.baseUrl}${url}`, { headers: this.headers } )
      .pipe( catchError( this.formatErrors ) );
  }
}
