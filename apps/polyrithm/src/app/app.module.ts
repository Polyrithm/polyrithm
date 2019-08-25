import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { ApiModule } from '@polyrithm/api';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }), EffectsModule.forRoot([AppEffects]),
    ApiModule.forRoot({
      baseUrl: 'https://localhost:4200/api'
    })
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
