import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private httpClient: HttpClient) { }



  getCountries() : Observable<Country[]> {
     return this.httpClient.get<GetResponseCountries>('http://localhost:8080/countries').pipe(
      map(response => response._embedded.countries)
     )
  }

  getStates(id:number) : Observable<Country[]> {
    return this.httpClient.get<GetResponseStates>(`http://localhost:8080/countries/${id}/states`).pipe(
     map(response => response._embedded.states)
    )
 }
}

interface GetResponseCountries{
  _embedded:{
    countries: Country[];
  }
}

interface GetResponseStates{
  _embedded:{
    states: State[];
  }
}
