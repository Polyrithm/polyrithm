import { InjectionToken } from '@angular/core';
import { BaseApiConfig } from './api-config.interface';

export const ApiConfig = new InjectionToken<BaseApiConfig>( 'BaseApiConfig' );
