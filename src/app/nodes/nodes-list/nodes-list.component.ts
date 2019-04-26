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
  timeout = 0;
  reload_timeout = 'Paused';

  constructor(private NodesService: NodesService,
              private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.getNodes();
    this.getStatus();
    this.getStates();

  }

  uniqueNodes( list: Node[]): Node[] {
    let ids: number[] = [];
    let unodes: Node[] = [];
    for( let node of list) {
      let index = ids.indexOf( node.id );
      if (index == -1) {
        ids.push( node.id);
        unodes.push(node);
      }
    }
    return unodes;
  }

  getNodes(): void {
    if (this.pickedStates.length > 0 || this.pickedStatus.length > 0) {
      this.nodes = [];

      for (const stateId of this.pickedStates) {
        this.NodesService.getNodesByState(stateId).subscribe(nodes => {
            this.nodes = this.nodes.concat(nodes);
          },
          error => {
          },
          () => {
            this.nodes = this.uniqueNodes( this.nodes);
          });
      }

      for (const statusId of this.pickedStatus) {
        this.NodesService.getNodesByStatus(statusId).subscribe(nodes => {
            this.nodes = this.nodes.concat(nodes);
          },
          error => {
          },
          () => {
            this.nodes = this.uniqueNodes( this.nodes);
          });
      }
    }
    else {
      this.NodesService.getNodes().subscribe(nodes => this.nodes = nodes);
    }
  }

  reload_page(): void {
    if(this.reloader) {
      this.reloader.unsubscribe();
    }

    console.log('New timeout:', this.timeout);
    if (this.timeout > 0) {
      const attemptsCounter = interval(5000); // every five second
      this.reloader = attemptsCounter.subscribe(n => {
        // do your stuff;
        this.getNodes();
        console.log('ticker: ' + n);
      });
    }
  }

  setTimeout( timeout: number): void {
    this.timeout = timeout;
    this.reload_page();
    if (timeout == 0) {
      this.reload_timeout = 'Paused';
    } else if (timeout == 5000) {
      this.reload_timeout = '5s';
    } else if (timeout == 10000) {
      this.reload_timeout = '10s';
    } else if (timeout == 30000) {
      this.reload_timeout = '30s';
    } else if (timeout == 60000) {
      this.reload_timeout = '1m';
    } else if (timeout == 300000) {
      this.reload_timeout = '5m';
    }
  }


  static addOrRemove<T>(member: T, list: T[]): T[] {

    const index = list.indexOf( member );

    if ( index == -1) {
      list.push(member);
    } else {
      list.splice(index, 1);
    }

    return list;
  }

  static intersect<T>(list1: T[], list2: T[]): T[] {

    const newlist: T[] = [];

    for ( const element of list1 ) {
      if (list2.indexOf( element) > -1) {
        newlist.push( element );
      }
    }

    return newlist;


  }



  getNodesByState(stateId: number): void {
    this.pickedStates = NodesListComponent.addOrRemove( stateId, this.pickedStates);
    this.getNodes();
  }

  getNodesByStatus(statusId: number): void {
    this.pickedStatus = NodesListComponent.addOrRemove( statusId, this.pickedStatus);
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
}
