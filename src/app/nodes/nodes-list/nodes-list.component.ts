import { Component, OnInit } from '@angular/core';
import { NodesService } from '../nodes.service';
import { Node, Status, State } from '../nodes.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-nodes-list',
  templateUrl: './nodes-list.component.html',
  styleUrls: ['./nodes-list.component.css']
})
export class NodesListComponent implements OnInit {
  nodes: Node[];
  states: State[];
  status: Status[];
  nodeStatusId: number;
  nodeStateId: number;
  id: number;

  constructor(private NodesService: NodesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getNodes();
    this.getStatus();
    this.getStates();
  }

  getNodes(): void {

    this.nodeStatusId = Number(this.route.snapshot.paramMap.get("node_status_id"));
    this.nodeStateId = Number(this.route.snapshot.paramMap.get("node_state_id"));
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    console.log( this.id )
    console.log( this.nodeStateId )
    console.log( this.nodeStatusId )

    if ( this.id ) {
      this.NodesService.getNode(this.id).subscribe(nodes => this.nodes = nodes);
    }
    else if ( this.nodeStateId) {
      this.NodesService.getNodesByState(this.nodeStateId).subscribe(nodes => this.nodes = nodes);
    }
    else if ( this.nodeStatusId) {
      this.NodesService.getNodesByStatus(this.nodeStatusId).subscribe(nodes => this.nodes = nodes);
    }
    else {
      this.NodesService.getNodes().subscribe(nodes => this.nodes = nodes);
    }
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




