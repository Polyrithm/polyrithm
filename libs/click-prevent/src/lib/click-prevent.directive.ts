import { Directive, Output, EventEmitter, Renderer2, ElementRef, OnInit, OnDestroy, HostListener } from '@angular/core';

@Directive({
  selector: '[click.prevent]'
})
export class ClickPreventDirective implements OnInit, OnDestroy {

  @Output("click.prevent")
  stopPropEvent = new EventEmitter();

  constructor(private renderer: Renderer2, private element: ElementRef) {
  }

  ngOnInit() {
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.stopPropEvent.emit(event);
  }

  ngOnDestroy() {
  }

}
