import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ButtonsModule} from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { FormsModule } from '@angular/forms';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { RoutingModule } from './routing.module';
import { CloudsListComponent } from './clouds/clouds-list/clouds-list.component';
import { NodesListComponent } from './nodes/nodes-list/nodes-list.component';
import {SettingsPageComponent} from './settings/settings-page/settings-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CloudsListComponent,
    NodesListComponent,
    SettingsPageComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule ,
    HttpClientModule,
    FormsModule,
//    NgbModule,
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
