# api

Shareable ApiService as a wrapper for Angular HttpClient

## Usage

```ts
//app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { ApiModule } from '@polyrithm/api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ApiModule.forRoot({ baseUrl: 'https://localhost:4200/api' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

// feature.component.ts

import { Component } from '@angular/core';
import { ApiService } from '@polyrithm/api';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {
  title = 'polyrithm';

  cats$ = this.api.get('/cats');
  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.cats$.subscribe(cats => console.log(cats))
  }
}




```

## Running unit tests

Run `nx test api` to execute the unit tests.
