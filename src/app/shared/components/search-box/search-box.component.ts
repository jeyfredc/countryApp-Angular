import { Component, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {
  @Output()
  public searchByCapital: searchByCapital<string> = new EventEmitter();

  @Input()
  public placeholder : string = '';
}
