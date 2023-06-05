import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})

export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = []
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  public selectedRegion?: Region;

constructor(private countriesService: CountriesService){}
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries
    this.selectedRegion=this.countriesService.cacheStore.byRegion.region
  }

  searchByRegion( term:Region):void {
    /* Para que sea llamado el servicio es necesario que despues de la invocacion del metodo con el parametro es decir
    searchCapital(term) se agregue el .suscribe() y asi si se va a ejecutar el servicio
    */
    this.selectedRegion= term;
    this.countriesService.searchRegion(term).subscribe( countries => {
      this.countries = countries; // Elemento que se retorna al html
    })
  }
}
