import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent {
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Input()
  public placeholder: string = '';

  public term: string = '';

  emitValue(value:string) {
    this.onValue.emit(value);
    // console.log(value);

  }
}
