import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {
  /* Es el elemento que se va a devolver al html y debe ser devuelto en el suscribe */
  public countries: Country[] = []

/*  para que se pueda utilzar el servicio que conecta con el endpoint se debe importar el servicio en este caso de CountriesService y se llama en el constructor*/
  constructor( private countriesService: CountriesService ){}

  searchByCapital( term:string):void {
    /* Para que sea llamado el servicio es necesario que despues de la invocacion del metodo con el parametro es decir
    searchCapital(term) se agregue el .suscribe() y asi si se va a ejecutar el servicio
    */
    this.countriesService.searchCapital(term).subscribe( countries => {
      this.countries = countries; // Elemento que se retorna al html
    })
  }
}
