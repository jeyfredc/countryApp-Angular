import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  public countries: Country[] = []

constructor(private countriesService: CountriesService){}

  searchByCountry( term:string):void {
    /* Para que sea llamado el servicio es necesario que despues de la invocacion del metodo con el parametro es decir
    searchCapital(term) se agregue el .suscribe() y asi si se va a ejecutar el servicio
    */

    this.countriesService.searchCountry(term).subscribe( countries => {
      this.countries = countries; // Elemento que se retorna al html
    })
  }

}
