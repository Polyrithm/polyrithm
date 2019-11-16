import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseApiConfig } from './api-config.interface';
import { ApiService } from './api.service';
import { ApiConfig } from './api-config.token';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [ CommonModule, HttpClientModule ],
  providers: [
    {
      provide: ApiConfig,
      useValue: { baseUrl: '/api', headers: {} }
    }
  ]
})
export class ApiModule {

  static forRoot(apiConfig: BaseApiConfig): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        ApiService,
        {
          provide: ApiConfig,
          useValue: apiConfig
        }
      ]
    }
  }

  static forFeature(apiConfig: BaseApiConfig): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        ApiService,
        {
          provide: ApiConfig,
          useValue: apiConfig
        }
      ]
    }
  }

}
