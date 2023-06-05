import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map,tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiurl: string = 'https://restcountries.com/v3.1';

  /* Creado para mantener la persistencia de datos al cambiar entre paginas, es el unico lugar donde se va a mantener la data que hayamos
  buscado en la aplicacion se va a crear una interfaz en cache-store.interface */
public cacheStore: CacheStore = {
  byCapital:   {term: '', countries: []},
  byCountries: {term: '', countries: []},
  byRegion:    {region: '', countries: []},

}

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore) )
  }

  private loadFromLocalStorage(){
    if(!localStorage.getItem('cacheStore'))return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!)
  }

/* Metodo creado para refactorizar codigo en las peiticiones search Capital, Country y Region */
  private getCountriesRequest(url:string):Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(() => of([])),
      // delay(2000)
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiurl}/alpha/${code}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map( countries => countries.length >0 ? countries[0] : null),
      catchError( ()=> of(null))
    )
  }

  /* si se pone los : Observable<Country[]> es lo que va a retornar la función se debe poner tambien despues del get, si no se pone va a marcar un error */
  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiurl}/capital/${term}`;
    /* A traves del pipe se hace el manejo de errores, Observable, of y catchError vienen de la libreria de rxjs */
    /* el metodo getCountriesRequest reemplaza el siguiente refactorizando todo el codigo */
/*     return this.http.get<Country[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    ); */
    /* Con el operador tap dispara un efecto secundario y este se uiliza para recibir a traves de los countries, guarda el termino de busqueda y guarda el arreglo de paises que retorno la consulta */
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCapital={term, countries }),
      tap(()=>this.saveToLocalStorage())
    )
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiurl}/name/${term}`;
    // return this.http.get<Country[]>(url)
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byCountries={term, countries }),
      tap(()=>this.saveToLocalStorage())
    )
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiurl}/region/${region}`;
    // return this.http.get<Country[]>(url)
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries => this.cacheStore.byRegion={ region, countries }),
      tap(()=>this.saveToLocalStorage())
    )
  }
}
