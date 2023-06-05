import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject, debounceTime,Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})

/* El suscribe es un evento que siempre se esta escuchando en el navegador a pesar de que no se este utilizando algun componente
es por ello que existe otro evento llamado onDestroy para poder limpiar todas las suscripciones que tengamos */
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncerSuscription?: Subscription;
  /* Subject es un tipo especial de observable  */
  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public initialValue:string='';
  /* El ngOnInit es utilizado para poder utilizar un Observavle y a suvez la libreria de rxjs para implementar metodos que pueden llegar a ser consecutivos en funcion
  el pipe sirbve para implementar otros metodos como debounceTime que lo que indica es que despues de escribir espere 1 segundo y luego muestre
  por consola lo que se escribio despues de haber esperado un segundo y esto sirve para hacer peticiones en un buscador */
  ngOnInit(): void {
   this.debouncerSuscription = this.debouncer.pipe(debounceTime(1000)).subscribe((value) => {
      // console.log('deboucer value', value);
      /* Emitir el valor recibido en el buscador */
      this.onValue.emit(value);
    });
  }

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Input()
  public placeholder: string = '';

  public term: string = '';

  emitValue(value: string) {
    this.onValue.emit(value);
    // console.log(value);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
/* Sirve para finalizar las suscripciones y ayudar a optimizar memoria en el navegador*/
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe()

  }


}
