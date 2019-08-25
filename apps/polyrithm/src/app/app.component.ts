import { Component } from '@angular/core';
import { ApiService } from '@polyrithm/api';

@Component({
  selector: 'polyrithm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'polyrithm';

  cats$ = this.api.get('/cats');
  constructor(private api: ApiService) {
  }
}
