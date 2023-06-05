import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiurl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

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
    return this.http.get<Country[]>(url).pipe(
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiurl}/name/${term}`;
    return this.http.get<Country[]>(url)
  }

  searchRegion(term: string): Observable<Country[]> {
    const url = `${this.apiurl}/region/${term}`;
    return this.http.get<Country[]>(url)
  }
}
