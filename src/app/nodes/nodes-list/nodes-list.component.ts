import { Component, OnInit } from '@angular/core';
import { NodesService } from '../nodes.service';
import { Node, Status, State } from '../nodes.model';
import {ActivatedRoute, Router} from '@angular/router';
import {interval} from 'rxjs';

@Component({
  selector: 'app-nodes-list',
  templateUrl: './nodes-list.component.html',
  styleUrls: ['./nodes-list.component.css']
})

export class NodesListComponent implements OnInit {
  nodes: Node[];
  states: State[];
  status: Status[];

  pickedStates: number[] = [];
  pickedStatus: number[] = [];

  reloader;
  timeout: number = 0;

  constructor(private NodesService: NodesService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    this.getNodes();
    this.getStatus();
    this.getStates();

  }

  getNodes(): void {
    if (this.pickedStates.length != 0 || this.pickedStatus.length != 0) {
      this.nodes = []

      for (let stateId of this.pickedStates) {
        this.NodesService.getNodesByState(stateId).subscribe(nodes => {
          this.nodes = this.nodes.concat( nodes )
          });
      }

      for (let statusId of this.pickedStatus) {
        this.NodesService.getNodesByStatus(statusId).subscribe(nodes => {
          this.nodes = this.nodes.concat( nodes )
        });
      }
    }
    else {
      this.NodesService.getNodes().subscribe(nodes => this.nodes = nodes);
    }
  }

  reload_page(): void {
    if (this.timeout == 0) {
      this.reloader.unsubscribe();
    }
    else {
      const attemptsCounter = interval(5000); //every five second
      this.reloader = attemptsCounter.subscribe(n => {
        //do your stuff;
        this.getNodes();
        console.log("ticker: " + n);
      });
    }
  }


  addOrRemove<T>(member: T, list: T[]): T[] {

    let index = list.indexOf( member );

    if ( index == -1) {
      list.push(member);
    }
    else {
      list.splice(index, 1);
    }

    return list;
  }

  intersect<T>(list1:T[], list2:T[]): T[] {

    let newlist: T[] = [];

    for ( let element of list1 ) {
      if (list2.indexOf( element) > -1) {
        newlist.push( element );
      }
    }

    return newlist;


  }



  getNodesByState(stateId:number): void {
    this.pickedStates = this.addOrRemove( stateId, this.pickedStates);
    this.getNodes();
  }

  getNodesByStatus(statusId:number): void {
    this.pickedStatus = this.addOrRemove( statusId, this.pickedStatus);
    this.getNodes();
  }

  getStates(): void {
    this.NodesService.getStates()
      .subscribe(states => this.states = states);
  }

  getStatus(): void {
    this.NodesService.getStatus()
      .subscribe(status => this.status = status);
  }

  flipAutoupdate(): void {
    console.log('flipping update status...')
    if (this.timeout == 0) {
      this.timeout = 5000;
    }
    else {
      this.timeout = 0;
    }
    this.reload_page();
  }

}
