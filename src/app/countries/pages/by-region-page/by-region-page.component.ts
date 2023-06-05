import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public regions: Country[] = []

constructor(private countriesService: CountriesService){}

  searchByRegion( term:string):void {
    /* Para que sea llamado el servicio es necesario que despues de la invocacion del metodo con el parametro es decir
    searchCapital(term) se agregue el .suscribe() y asi si se va a ejecutar el servicio
    */

    this.countriesService.searchRegion(term).subscribe( regions => {
      this.regions = regions; // Elemento que se retorna al html
    })
  }
}
