import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {
  /* Es el elemento que se va a devolver al html y debe ser devuelto en el suscribe */
  public countries: Country[] = []
  public isLoading: Boolean = false
  public initialValue: string = ''

/*  para que se pueda utilzar el servicio que conecta con el endpoint se debe importar el servicio en este caso de CountriesService y se llama en el constructor*/
  constructor( private countriesService: CountriesService ){}
  ngOnInit(): void {
    /* carga el arreglo de paises que se haya realizado en alguna consulta */
    this.countries = this.countriesService.cacheStore.byCapital.countries
    /* Carga termino de busqueda */
    this.initialValue = this.countriesService.cacheStore.byCapital.term
  }

  searchByCapital( term:string):void {

    this.isLoading=true
    /* Para que sea llamado el servicio es necesario que despues de la invocacion del metodo con el parametro es decir
    searchCapital(term) se agregue el .suscribe() y asi si se va a ejecutar el servicio
    */
    this.countriesService.searchCapital(term).subscribe( countries => {
      this.countries = countries; // Elemento que se retorna al html
      this.isLoading=false
    })
  }
}
