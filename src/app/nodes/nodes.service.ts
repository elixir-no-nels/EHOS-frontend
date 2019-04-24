import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Node, Status, State } from './nodes.model';
@Injectable({
  providedIn: 'root'
})
export class NodesService {

  private nodeUrl   = 'http://localhost:8888/nodes/';  // URL to web api
  private stateUrl  = 'http://localhost:8888/nodes/states/';  // URL to web api
  private statusUrl = 'http://localhost:8888/nodes/status/';  // URL to web api

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getNodes(): Observable<Node[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Node[]>(this.nodeUrl)
       .pipe(
          tap(_ => this.log('fetched nodes')),
          catchError(this.handleError<Node[]>('getNodes', [])));
  }

  getNodesByState(node_state_id:number): Observable<Node[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Node[]>(`${this.nodeUrl}?node_state_id=${node_state_id}`)
      .pipe(
        tap(_ => this.log('fetched nodes')),
        catchError(this.handleError<Node[]>('getNodes', [])));
  }

  getNodesByStatus(node_status_id:number): Observable<Node[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Node[]>(`${this.nodeUrl}?node_status_id=${node_status_id}`)
      .pipe(
        tap(_ => this.log('fetched nodes')),
        catchError(this.handleError<Node[]>('getNodes', [])));
  }

  getNode(id:number): Observable<Node[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Node[]>(`${this.nodeUrl}${id}`)
      .pipe(
        tap(_ => this.log('fetched nodes')),
        catchError(this.handleError<Node[]>('getNodes', [])));
  }


  getStates(): Observable<State[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<State[]>(this.stateUrl)
      .pipe(
        tap(_ => this.log('fetched states')),
        catchError(this.handleError<State[]>('getStates', [])));
  }

  getStatus(): Observable<Status[]> {
    // TODO: send the message _after_ fetching the heroes
    return this.http.get<Status[]>(this.statusUrl)
      .pipe(
        tap(_ => this.log('fetched status')),
        catchError(this.handleError<Node[]>('getStatus', [])));
  }


  constructor( private http: HttpClient, ) {}

  private log(message: string) {
    console.log(`NodesService: ${message}`);
  }


}


