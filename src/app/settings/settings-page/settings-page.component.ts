import { Component, OnInit } from '@angular/core';

import {SettingsService} from '../settings.service'
import { Setting } from '../settings.model';


@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  public settings: Setting[];

  constructor(private SettingsService: SettingsService,
              ) { }


  ngOnInit() {
    this.getSettings();
  }

  getSettings(): void {
    this.SettingsService.getSettings()
      .subscribe(settings => this.settings= settings);
  }


  changedSetting( setting:Setting ) :void {
    console.log( setting );
    this.SettingsService.updateSetting( setting )
  }
    

}
