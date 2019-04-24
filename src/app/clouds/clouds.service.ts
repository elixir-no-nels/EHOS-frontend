import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Cloud } from './clouds.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class CloudsService {

  private cloudUrl  = 'http://localhost:8888/clouds/';  // URL to web api

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getClouds(): Observable<Cloud[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Cloud[]>(this.cloudUrl)
       .pipe(
          tap(_ => this.log('fetched clouds')),
          catchError(this.handleError<Cloud[]>('getClouds', [])));
  }

  /** GET cloud by id. Will 404 if id not found */
  getCloud(id:number): Observable<Cloud> {
    const url = `${this.cloudUrl}/${id}`;
    return this.http.get<Cloud>(url).pipe(
      tap(_ => this.log(`fetched cloud id=${id}`)),
      catchError(this.handleError<Cloud>(`getCloud id=${id}`))
    );
  }


  constructor(private http: HttpClient, ) { }

  private log(message: string) {
    console.log(`CloudsService: ${message}`);
  }


}




