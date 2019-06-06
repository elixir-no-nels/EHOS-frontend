import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



import { Setting } from './settings.model';



@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settingsUrl  = 'http://localhost:8888/settings/';  // URL to web api

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getSettings(): Observable<Setting[]> {
    return this.http.get<Setting[]>(this.settingsUrl)
      .pipe(
        tap(_ => this.log('fetched settings')),
        catchError(this.handleError<Setting[]>('getSettings', [])));
  }


  updateSetting(setting:Setting): void {

    //console.log('saving setting:', setting );
    let url = `${this.settingsUrl}${setting['id']}`;
    //let url  = `${this.settingsUrl}`;
    //console.log( 'Settings URL: ['+url+']' );
    //console.log('saving setting:', setting );

    this.http.patch('http://localhost:8888/settings/5', setting, httpOptions).pipe(
      tap(_ => console.log(`updated setting`)),
      catchError(this.handleError<Setting[]>('updateSetting', []))
    ).subscribe(
      (val) => {
        console.log("PATCH call successful value returned in body",
          val);
      },
      response => {
        console.log("PATCH call in error", response);
      },
      () => {
        console.log("The PATCH observable is now completed.");
      });

    //return( void );
  }


  constructor(private http: HttpClient, ) { }

  private log(message: string) {
    console.log(`SettingsService: ${message}`);
  }

}
