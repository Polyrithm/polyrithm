import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickPreventDirective } from './click-prevent.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ClickPreventDirective],
  exports: [ClickPreventDirective]
})
export class ClickPreventModule {}
