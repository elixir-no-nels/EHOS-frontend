import { Component, OnInit } from '@angular/core';
import { Cloud } from '../clouds.model';
import {CloudsService} from '../clouds.service';

@Component({
  selector: 'app-clouds-list',
  templateUrl: './clouds-list.component.html',
  styleUrls: ['./clouds-list.component.css']
})
export class CloudsListComponent implements OnInit {

  clouds: Cloud[];

  constructor(private CloudsService: CloudsService) { }

  ngOnInit() {
    this.getClouds();
  }

  getClouds(): void {
    this.CloudsService.getClouds()
    .subscribe(clouds => this.clouds = clouds);
  }

}


